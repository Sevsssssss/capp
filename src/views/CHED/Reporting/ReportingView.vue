<template>
<div v-if="nodata" style="height: 100%">
    <NoDataAvail />
</div>
<div v-else class="m-3">
    <DataCards :datas="numberOfHEI" />
    <div class="m-3 overflow-x-auto shadow-md rounded-sm">
        <div class="p-2 flex justify-between items-center">
            <div class="text-lg font-semibold py-2 px-4 text-grey-200"> NUMBER OF APPLICATION TYPES </div>
            <button class="btn-table" id="exportToPdfCharts">Export PDF</button>
        </div>
        <div class="">
            <canvas id="myChart"></canvas>
        </div>
    </div>
    <br>
    <div v-for="(appType, index) in listofPrograms" :key="appType" class="m-3 overflow-x-auto shadow-md rounded-sm">
        <div class="p-2  flex justify-between items-center">
            <div class="p-4 text-lg font-semibold"> {{appType.applicationType}} </div>
            <button v-if="appType.programList.length > 0" class="btn-table" @click="exportToPdfTables(appType.applicationType, index)">Export PDF</button>
        </div>
        <table v-if="appType.programList.length > 0" class=" w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">PROGRAMS</th>
                    <th scope="col" class="px-6 py-3">NUMBER OF HEIs APPLIED</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b" v-for="prog in appType.programList" :key="prog">
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ prog.program }}
                    </td>
                    <td class="px-6 py-4">
                        {{ prog.count }}
                    </td>
                </tr>

            </tbody>
        </table>
        <div v-if="appType.programList.length == 0" class="p-5 font-medium">
            <div class="noDataAvail text-center">No Data Available</div>
        </div>
        <div class="table-footer flex flex-row justify-between">
            <div class="flex flex-row pl-4 justify-center items-center">
                <span class="text-sm text-gray-700">
                    Showing
                    <span class="font-semibold text-gray-900">{{
              totalEntries[index] > 0 ? 1 + numPerPage * currentpage[index] : 0
            }}</span>
                    to
                    <span class="font-semibold text-gray-900">{{
              (currentpage[index] + 1) * numPerPage > totalEntries[index]
                ? totalEntries[index]
                : (currentpage[index] + 1) * numPerPage
            }}</span>
                    of
                    <span class="font-semibold text-gray-900">{{ totalEntries[index] }}</span>
                    Entries
                </span>
            </div>
            <div class="p-2 pr-4">
                <div class="btn-group">
                    <ul class="inline-flex -space-x-px">
                        <li>
                            <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="prevPage(index)">Previous</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="nextPage(index)">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <br>
</div>
</template>

<script>
import NoDataAvail from "@/components//NoDataAvail.vue";
import DataCards from "@/components//DataCards.vue";
import Chart from 'chart.js/auto';
import image from '@/assets/img/CHED_logo.png';
import Parse from "parse";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
    name: "ReportingView",
    components: {
        NoDataAvail,
        DataCards,
    },
    data() {
        return {
            numberOfHEI: [],
            listofPrograms: [],
            currentpage: [],
            numPerPage: 10,
            totalEntries: [],
            nodata: false,
            numdata: '',
            headers: [{
                    title: "PROGRAMS",
                },
                {
                    title: "Number of HEIs Applied",
                },
            ],
            objectName: [],
            objectNum: [],
            color: ["approval", "revision", "payment", "evaluation", "forcompliance", "verification", "issuance", "completed", "noncompliant"]
        };
    },
    methods: {
        prevPage(index) {
            if (this.currentpage[index] > 0) this.currentpage[index] -= 1;
        },
        nextPage(index) {
            if ((this.currentpage[index] + 1) * this.numPerPage < this.totalEntries[index]) {
                this.currentpage[index] += 1;
            }
        },
        exportToPdfTables(appType, index) {
            const date = new Date().toLocaleDateString("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
            const columns = [{
                    title: "PROGRAMS",
                    dataKey: "program",
                },
                {
                    title: "Number of HEIs Applied",
                    dataKey: "count",
                },
            ];
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: "letter",
            });
            var logo = new Image();
            logo.src = image;
            doc.addImage(logo, "png", 1.8, 0.85, 0.75, 0.75);
            doc.setFontSize(11);
            doc.setFont("times");
            doc.text("Republic of the Philippines", 4.24, 1, "center");
            doc.text("Office of the President", 4.24, 1.2, "center");
            doc.setFont("", "", "bold");
            doc.text("COMMISSION ON HIGHER EDUCATION", 4.24, 1.4, "center");
            doc.setFont("", "", "normal");
            doc.text("Regional Office V", 4.24, 1.6, "center");
            doc.text(date, 7.5, 2.5, "right");
            doc.setFont("", "", "bold");
            doc.text(appType.toString(), 0.5, 3);
            doc.setFont("", "", "normal");
            // text is placed using x, y coordinates
            // doc
            //     .setFont('helvetica')
            //     .setFontSize(16)
            //     .text(appType.toString(), 1, 5.0);
            // create a line under heading
            // doc.
            // setLineWidth(0.01)
            //     .line(4.5, 1.1, 8.0, 5.1);
            // Using autoTable plugin
            doc.autoTable({
                columns,
                body: this.listofPrograms[index].programList,
                margin: {
                    left: 0.5,
                    top: 3.2,
                },
            });

            const text =
                "*This is a system generated report from the CHED PROGRAMS APPLICATION MANAGEMENT SYSTEM.";
            doc.setFontSize(9);
            doc.text(text, 1, 10.2);
            window.open(doc.output("bloburl"), "_blank");
            // doc.save(filename);
        },
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));
        const ctx = document.getElementById('myChart');
        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var y = 0; y < accType.length; y++) {
            if (accType[y] === this.$route.path) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log(console.log.length);
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            const applications = Parse.Object.extend("Applications");
            const query = new Parse.Query(applications);

            const ApplType = Parse.Object.extend("ApplicationTypes");
            const appTypeQuery = new Parse.Query(ApplType);
            const appTypeResults = await appTypeQuery.find();

            //For Number of HEIs
            var totalApplication = 0;
            var applicationTypes = [];
            var appTypeCount = [];
            for (var i = 0; i < appTypeResults.length; i++) {
                var counter = 0;

                const pipeline = [{
                    group: {
                        objectId: '$createdBy',
                    }
                }];

                const applicationType = appTypeResults[i];
                const newQuery = query.equalTo("applicationType", applicationType.id);
                newQuery.aggregate(pipeline)

                counter = await newQuery.count();
                totalApplication += counter;
                console.log(totalApplication)

                applicationTypes.push(applicationType.get("applicationTypeName"));
                appTypeCount.push(counter);
                this.numberOfHEI.push({
                    title: applicationType.get("applicationTypeName"),
                    num: counter,
                    type: this.color[i],
                });

            }
            if (totalApplication == 0) {
                this.nodata = true;
            }

            //For List of Programs
            for (var k = 0; k < appTypeResults.length; k++) {
                var programList = [];
                var programInstance = [];
                // var progCounter = 0;
                const applicationType = appTypeResults[k];
                const newQuery = query.equalTo("applicationType", applicationType.id);
                const querResult = await newQuery.find();
                for (var l = 0; l < querResult.length; l++) {
                    const application = querResult[l];

                    const Programs = Parse.Object.extend("Programs");
                    const progQuery = new Parse.Query(Programs);
                    progQuery.equalTo("objectId", application.get("program"));
                    const progResults = await progQuery.first();

                    // const users = new Parse.Query(Parse.User);
                    // users.equalTo("objectId", application.get("createdBy"));
                    // const hei = await users.first({
                    //     useMasterKey: true,
                    // });
                    if (programList.includes(progResults.get("programName"))) {
                        var index = programList.indexOf(progResults.get("programName"))
                        programInstance[index] += 1;
                    } else {
                        programList.push(
                            progResults.get("programName")
                        );
                        programInstance.push(1);
                    }

                }

                var progNum = [];

                for (var q = 0; q < programList.length; q++) {
                    progNum.push({
                        program: programList[q],
                        count: programInstance[q]

                    });
                }
                this.listofPrograms.push({
                    applicationType: applicationType.get("applicationTypeName"),
                    programList: progNum,
                });
                this.totalEntries.push(programList.length);
                this.currentpage.push(0);
            }
        }
        this.numdata = {
            labels: applicationTypes,
            // ['Initial Permit', 'Renewal', 'Certificate of Program Compliance', 'Government Recognition'],
            datasets: [{
                label: 'Application Types',
                data: appTypeCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        };
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: this.numdata,
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                },
                layout: {
                    padding: 20
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            }
        });
        myChart;
        // var image = myChart.toBase64Image();
        // console.log(image);

        let element = document.getElementById("exportToPdfCharts");

        // document.getElementById('exportToPdfCharts')

        element.addEventListener("click", function () {
            try {
                const date = new Date().toLocaleDateString("en", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });
                var dataURL = ctx.toDataURL();
                var pdf = new jsPDF("p", "in", "letter");
                var logo = new Image();
                logo.src = image;
                // pdf.addImage(logo, "png", 1, 1, 0.75, 0.75);
                pdf.addImage(logo, "png", 1.8, 0.85, 0.75, 0.75);
                pdf.setFontSize(11);
                pdf.setFont("times");
                pdf.text("Republic of the Philippines", 4.24, 1, "center");
                pdf.text("Office of the President", 4.24, 1.2, "center");
                pdf.setFont("", "", "bold");
                pdf.text("COMMISSION ON HIGHER EDUCATION", 4.24, 1.4, "center");
                pdf.setFont("", "", "normal");
                pdf.text("Regional Office V", 4.24, 1.6, "center");
                pdf.text(date, 7.5, 2.5, "right");
                pdf.setFont("", "", "bold");
                pdf.text("NUMBER OF APPLICATION TYPES", 1, 3);
                pdf.setFont("", "", "normal");

                const text =
                    "*This is a system generated report from the CHED PROGRAMS APPLICATION MANAGEMENT SYSTEM.";
                    
                pdf.addImage(dataURL, 'JPEG', 1, 3.5, 6.5, 4);
                pdf.setFontSize(9);
                pdf.text(text, 1, 10.2);

                window.open(pdf.output("bloburl"), "_blank");
                // pdf.save(filename);
            } catch (error) {
                console.error("oops, something went wrong!", error);
            }

        });
    },
};
</script>

<style>
#container {
    height: 350px;
}
</style>
