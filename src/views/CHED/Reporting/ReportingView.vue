<template>
<div class="p-3">
    <div class="p-10 m-5">
        <canvas id="myChart"></canvas>
    </div>
    <!-- <DataCards :datas="numberOfHEI" /> -->
    <!-- <div> {{numberOfHEI}} </div>
    <div> {{listofPrograms}} </div> -->
    <div v-for="appType in listofPrograms" :key="appType" class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="p-2 flex justify-end">
            <button class="btn-table" @click="exportToPdf()">Export PDF</button>
        </div>
        <table class="w-full text-sm text-left text-gray-500" ref="exportable_table">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">HEI Name</th>
                    <th scope="col" class="px-6 py-3">PROGRAM</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b" v-for="prog in items" :key="prog">
                    <td class="px-6 py-4">
                        {{ prog.name }}
                    </td>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ prog.program }}
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
</div>
</template>

<script>
// import DataCards from "@/components//DataCards.vue";
import Chart from 'chart.js/auto';
import Parse from "parse";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
    name: "ReportingView",
    components: {
        // DataCards,
    },
    data() {
        return {
            numberOfHEI: [],
            listofPrograms: [],
            heading: "Sample PDF Generator",
            moreText: [
                "This is another few sentences of text to look at it.",
                "Just testing the paragraphs to see how they format.",
                "jsPDF likes arrays for sentences.",
                "Do paragraphs wrap properly?",
                "Yes, they do!",
                "What does it look like?",
                "Not bad at all.",
            ],
            headers: [{
                    title: "HEI Name",
                },
                {
                    title: "Programs",
                },
            ],
            items: [{
                    name: "one",
                    program: "two",
                },
                {
                    name: "one",
                    program: "two",
                },
                {
                    name: "one",
                    program: "two",
                },
                {
                    name: "one",
                    program: "two",
                },
                {
                    name: "one",
                    program: "two",
                },
            ],
        };
    },
    methods: {
        exportToPdf() {
            const columns = [{
                    title: "HEI Name",
                    dataKey: "name",
                },
                {
                    title: "Programs",
                    dataKey: "program",
                },
            ];
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "in",
                format: "letter",
            });
            // text is placed using x, y coordinates
            doc.setFontSize(16).text(this.heading, 0.5, 1.0);
            // create a line under heading
            doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
            // Using autoTable plugin
            doc.autoTable({
                columns,
                body: this.items,
                margin: {
                    left: 0.5,
                    top: 1.25,
                },
            });
            doc.save(`${this.headers.title}.pdf`);
            // Using array of sentences
            // doc.setFont("helvetica").setFontSize(12).text(this.moreText, 0.5, 3.5, {
            //     align: "left",
            //     maxWidth: "7.5",
            // });

            // Creating footer and saving file

            // .setFont("times")
            // .setFontSize(11)
            // .setFontStyle("italic")
            // .setTextColor(0, 0, 255)
            // .text(
            //     "This is a simple footer located .5 inches from page bottom",
            //     0.5,
            //     doc.internal.pageSize.height - 0.5
            // )
        },
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

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
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            const applications = Parse.Object.extend("Applications");
            const query = new Parse.Query(applications);

            const ApplType = Parse.Object.extend("ApplicationTypes");
            const appTypeQuery = new Parse.Query(ApplType);
            const appTypeResults = await appTypeQuery.find();

            const ctx = document.getElementById('myChart');

            //For Number of HEIs
            for (var i = 0; i < appTypeResults.length; i++) {
                var listOfHEI = [];
                const applicationType = appTypeResults[i];
                const newQuery = query.equalTo("applicationType", applicationType.id);
                const querResult = await newQuery.find();
                var counter = 0;
                console.log(querResult.length);
                for (var j = 0; j < querResult.length; j++) {
                    const application = querResult[j];
                    if (!listOfHEI.includes(application.get("createdBy"))) {
                        listOfHEI.push(application.get("createdBy"));
                        counter++;
                    }
                }
                this.numberOfHEI.push({
                    title: applicationType.get("applicationTypeName"),
                    num: counter,
                    type: "approval",
                });

                const numdata = {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: 'Number of Application Types',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                };

                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: numdata,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                myChart;
            }

            //For List of Programs
            for (var k = 0; k < appTypeResults.length; k++) {
                var programList = [];
                const applicationType = appTypeResults[k];
                const newQuery = query.equalTo("applicationType", applicationType.id);
                const querResult = await newQuery.find();
                console.log(querResult.length);
                for (var l = 0; l < querResult.length; l++) {
                    const application = querResult[l];

                    const Programs = Parse.Object.extend("Programs");
                    const progQuery = new Parse.Query(Programs);
                    progQuery.equalTo("objectId", application.get("program"));
                    const progResults = await progQuery.first();

                    const users = new Parse.Query(Parse.User);
                    users.equalTo("objectId", application.get("createdBy"));
                    const hei = await users.first({
                        useMasterKey: true,
                    });

                    programList.push({
                        program: progResults.get("programName"),
                        hei: hei.get("hei_name"), // Change to Name of HEI
                    });
                }
                this.listofPrograms.push({
                    applicationType: applicationType.get("applicationTypeName"),
                    programList: programList,
                });
            }
        }
    },
};
</script>

<style>
#container {
    height: 350px;
}
</style>
