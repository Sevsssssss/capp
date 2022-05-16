<template>
<div v-if="nodata" style="height: 100%">
    <NoDataAvail />
</div>
<div v-else class="p-3">
    <DataCards :datas="numberOfHEI" />
    <div class="p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="p-2 flex justify-between items-center">
            <div class="text-lg font-semibold"> Number of Application Types </div>
            <button class="btn-table" id="exportToPdfCharts">Export PDF</button>
        </div>
        <div>
            <canvas id="myChart"></canvas>
        </div>
    </div>
    <br>
    <div v-for="(appType, index) in listofPrograms" :key="appType" class="p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="p-2  flex justify-between items-center">
            <div class="text-lg font-semibold"> {{appType.applicationType}} </div>
            <button class="btn-table" @click="exportToPdfTables(index)">Export PDF</button>
        </div>
        <table class=" w-full text-sm text-left text-gray-500">
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
        <div class="table-footer flex flex-row justify-between">
            <div class="flex flex-row pl-4 justify-center items-center">
                <span class="text-sm text-gray-700">
                    Showing
                    <span class="font-semibold text-gray-900">{{
              totalEntries > 0 ? 1 + numPerPage * currentpage : 0
            }}</span>
                    to
                    <span class="font-semibold text-gray-900">{{
              (currentpage + 1) * numPerPage > totalEntries
                ? totalEntries
                : (currentpage + 1) * numPerPage
            }}</span>
                    of
                    <span class="font-semibold text-gray-900">{{ totalEntries }}</span>
                    Entries
                </span>
            </div>
            <div class="p-2 pr-4">
                <div class="btn-group">
                    <ul class="inline-flex -space-x-px">
                        <li>
                            <a href="#" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="prevPage()">Previous</a>
                        </li>
                        <li>
                            <a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="nextPage()">Next</a>
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
            nodata: false,
            moreText: [
                "This is another few sentences of text to look at it.",
                "Just testing the paragraphs to see how they format.",
                "jsPDF likes arrays for sentences.",
                "Do paragraphs wrap properly?",
                "Yes, they do!",
                "What does it look like?",
                "Not bad at all.",
            ],
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
        exportToPdfTables(index) {
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
            // text is placed using x, y coordinates
            doc.setFontSize(16).text("Application", 0.5, 1.0);
            // create a line under heading
            doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
            // Using autoTable plugin
            doc.autoTable({
                columns,
                body: this.listofPrograms[index].programList,
                margin: {
                    left: 0.5,
                    top: 1.25,
                },
            });
            doc.save(`application.pdf`);
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
                var listOfHEI = [];
                const applicationType = appTypeResults[i];
                const newQuery = query.equalTo("applicationType", applicationType.id);
                const querResult = await newQuery.find();
                // var counter = 0;
                for (var j = 0; j < querResult.length; j++) {
                    const application = querResult[j];
                    if (!listOfHEI.includes(application.get("createdBy"))) {
                        listOfHEI.push(application.get("createdBy"));
                        // counter++;
                    }
                    totalApplication++;
                }

                applicationTypes.push(applicationType.get("applicationTypeName"));
                appTypeCount.push(querResult.length);
                this.numberOfHEI.push({
                    title: applicationType.get("applicationTypeName"),
                    num: querResult.length,
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
                    console.log(progResults.get("programName"));
                    console.log("sad " + programList.includes(progResults.get("programName")));
                    if (programList.includes(progResults.get("programName"))) {
                        console.log("nanis");
                        var index = programList.indexOf(progResults.get("programName"))
                        programInstance[index] += 1;
                    } else {
                        programList.push(
                            progResults.get("programName")
                        );
                        programInstance.push(1);
                    }

                    console.log(programList);

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
            var dataURL = ctx.toDataURL();

            var margin = 2;
            var imgWidth = 210 - 2 * margin;
            var pageHeight = 295;
            var imgHeight = ctx.height * imgWidth / ctx.width;
            var heightLeft = imgHeight;

            // create new pdf and add our new canvas as an image
            var pdf = new jsPDF('p', 'mm');
            // var canvas = $("#chartContainer .canvasjs-chart-canvas").get(0);
            // const pageWidth = pdf.internal.pageSize.getWidth();
            // const pageHeight = pdf.internal.pageSize.getHeight();

            // const widthRatio = pageWidth / ctx.width;
            // const heightRatio = pageHeight / ctx.height;
            // const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

            // const canvasWidth = ctx.width * ratio;
            // const canvasHeight = ctx.height * ratio;

            // const marginX = (pageWidth - canvasWidth) / 2;
            // const marginY = (pageHeight - canvasHeight) / 2;
            // create a line under heading

            // download the pdf
            // pdf.addImage(dataURL, 'PNG', 4, marginY, canvasWidth, canvasHeight);

            var position = 0;

            pdf.addImage(dataURL, 'PNG', margin, position, imgWidth, imgHeight);

            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(dataURL, 'PNG', margin, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('filename.pdf');
        });
    },
};
</script>

<style>
#container {
    height: 350px;
}
</style>
