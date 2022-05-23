<template>
<div class="">
    <!-- <div class="p-4">
        <div class="flex flex-row text-left items-center  space-x-4">
            <img src="@/assets/img/CHED_logo.png" class="h-28 w-28" />
            <div class="space-y-2">
                <div class="font-semibold text-2xl xxs:leading-tight">
                    CHED Program Applications Management System
                </div>
            </div>
        </div>
    </div> -->
    <div class="flex">
        <div class="flex flex-col w-full p-5 m-5 bg-brand-white rounded-md shadow-lg">
            <div class="flex items-center pb-4">
                <hr class="border border-light-400 w-full mx-4" />
                <div class="text-lg items-start font-extrabold uppercase text-grey-200">
                    Statistics
                </div>
                <hr class="border border-light-400 w-full mx-4" />
            </div>
            <div class="flex xxl:flex-row xl:flex-row md:flex-col xxs:flex-col justify-evenly items-center pb-4">
                <div class="flex flex-col items-center">
                    <span class="label-s uppercase text-grey-300"> Total Number of HEI </span>
                    <hr class="border border-light-400 w-16 mx-4" />
                    <div class="text-lg font-extrabold">{{this.heis}}</div>
                </div>
                <div class="flex flex-col items-center">
                    <span class="label-s uppercase text-grey-300"> Total Number of RQAT </span>
                    <hr class="border border-light-400 w-16 mx-4" />
                    <div class="text-lg font-extrabold">{{this.rqat}}</div>
                </div>
                <div class="flex flex-col items-center ">
                    <span class="label-s uppercase text-grey-300"> Total Number of Employees </span>
                    <hr class="border border-light-400 w-16 mx-4" />
                    <div class="text-lg font-extrabold">{{this.emp}}</div>
                </div>
                <div class="flex flex-col items-center">
                    <span class="label-s uppercase text-grey-300"> Total Number of Program </span>
                    <hr class="border border-light-400 w-16 mx-4" />
                    <div class="text-lg font-extrabold">{{this.programs}}</div>
                </div>
            </div>
            <div class="flex xxl:flex-row xl:flex-row md:flex-col xxs:flex-col justify-evenly items-center pb-2">
                <div class="flex flex-col items-center">
                    <span class="label-s uppercase text-grey-300"> Total Number of Applications </span>
                    <hr class="border border-light-400 w-16 mx-4" />
                    <div class="text-lg font-extrabold">{{this.applications}}</div>
                </div>
                <div class="flex flex-col items-center">
                    <span class="label-s uppercase text-grey-300"> Total Number of CMO </span>
                    <hr class="border border-light-400 w-16 mx-4" />
                    <div class="text-lg font-extrabold">{{this.cmo}}</div>
                </div>
                <div class="flex flex-col items-center">
                    <span class="label-s uppercase text-grey-300"> Total Number of Evaluation Ins </span>
                    <hr class="border border-light-400 w-16 mx-4" />
                    <div class="text-lg font-extrabold">{{this.eval}}</div>
                </div>
                <div class="flex flex-col items-center">
                    <span class="label-s uppercase text-grey-300"> Total Number of Discipline </span>
                    <hr class="border border-light-400 w-16 mx-4" />
                    <div class="text-lg font-extrabold">{{this.disc}}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="flex flex-row justify-evenly">
        <div class="flex flex-col w-fit p-8 m-5 bg-brand-white rounded-md shadow-lg justify-evenly">
            <div class="flex flex-row items-center">
                <div class="flex flex-col  space-y-1">
                     <div class="text-lg items-start font-extrabold uppercase text-grey-300">
                        Higher Education Institutions
                    </div>
                    <div class="text-3xl font-extrabold text-end">12k</div>

                </div>
            </div>
            <hr class="m-3" />
            <div class="">
                <div class="carousel w-full">
                    <div id="slide1-one" class="carousel-item relative w-full">
                        <div class="grid grid-cols-2 w-full divide-x">
                            <div class="">
                                <div class="font-bold text-lg">12</div>
                                <span class="label-s text-grey-400"> SUC </span>
                            </div>
                            <div class="">
                                <div class="font-bold text-lg">123</div>
                                <span class="label-s text-grey-400"> LUC </span>
                            </div>
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/4">
                            <a href="#slide2-one" class="text-grey-200">❮</a>
                            <a href="#slide2-one" class="text-grey-200">❯</a>
                        </div>
                    </div>
                    <div id="slide2-one" class="carousel-item relative w-full">
                        <div class="grid grid-cols-2 w-full divide-x">
                            <div class="">
                                <div class="font-bold text-lg">12</div>
                                <span class="label-s text-grey-400"> PRIVATE </span>
                            </div>
                            <div class="">
                                <div class="font-bold text-lg">123</div>
                                <span class="label-s text-grey-400"> OGS </span>
                            </div>
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/4">
                            <a href="#slide1-one" class="text-grey-200">❮</a>
                            <a href="#slide1-one" class="text-grey-200">❯</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="flex xxl:flex-row xl:flex-row md:flex-col xxs:flex-col justify-start items-start">
        <div class="w-1/2 p-4 mx-5 rounded-sm shadow-lg bg-brand-white flex flex-col justify-start items-start">
            <span class="text-lg font-extrabold py-4 px-4 text-grey-200"> Application Type </span>
            <canvas id="myBarChart"></canvas>
        </div>
        <div class="w-1/3 ml-12">
            <!-- <span class="text-lg font-extrabold"> Application Status </span> -->
            <canvas id="myPieChart"></canvas>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
import Chart from "chart.js/auto";

export default {
    data() {
        return {
            heis: 0,
            rqat: 0,
            emp: 0,
            programs: 0,
            applications: 0,
            cmo: 0,
            eval: 0,
            disc: 0
        }
    },
    name: "HomeView",
    components: {},
    mounted: async function () {
        console.log("hi");
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var homeType = querResult[0].get("hometype");
        var flag = 0;
        if (homeType === "/home") {
            flag = 1;
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        }
        const queryhei = new Parse.Query(Parse.User);
        queryhei.notEqualTo("hei_type", null);
        const count = await queryhei.count();
        this.heis = count;

        const queryrqat = new Parse.Query(Parse.User);
        queryrqat.notEqualTo("hei_affil", null);
        const count1 = await queryrqat.count();
        this.rqat = count1;

        const queryemp = new Parse.Query(Parse.User);
        queryemp.notEqualTo("designation", null);
        const count2 = await queryemp.count();
        this.emp = count2;

        const programs = Parse.Object.extend("Programs");
        const queryprograms = new Parse.Query(programs);
        const count3 = await queryprograms.count();
        this.programs = count3;

        const app = Parse.Object.extend("Applications");
        const queryapp = new Parse.Query(app);
        const count4 = await queryapp.count();
        this.applications = count4;

        const cmos = Parse.Object.extend("CHED_MEMO");
        const querycmo = new Parse.Query(cmos);
        const count5 = await querycmo.count();
        this.cmo = count5;

        const evals = Parse.Object.extend("EvaluationInstruments");
        const queryeval = new Parse.Query(evals);
        const count6 = await queryeval.count();
        this.eval = count6;

        const discs = Parse.Object.extend("Disciplines");
        const querydiscs = new Parse.Query(discs);
        const count7 = await querydiscs.count();
        this.disc = count7;

        const ctx = document.getElementById("myBarChart");
        const ctxPie = document.getElementById("myPieChart");
        const myBarChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Initial Permit", "Renewal", "Certificate of Compliance", "Government Recognition"],
                datasets: [{
                    label: "# of Votes",
                    data: [12, 19, 3, 10],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(255, 99, 132, 1)",
                        "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 1,
                }, ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
        const myPieChart = new Chart(ctxPie, {
            type: "pie",
            data: {
                labels: [
                    "Approval",
                    "Revision",
                    "Payment",
                    "Inspection",
                    "Compliance",
                    "Verification",
                    "Issuance",
                    "Completed",
                    "Compliant",

                ],
                datasets: [{
                    label: "My First Dataset",
                    data: [30, 50, 10, 20, 9, 10, 13, 40, 3],
                    backgroundColor: [
                        "rgb(255, 103, 0)",
                        "rgb(0, 0, 255)",
                        "rgb(59, 130, 246)",
                        "rgb(241, 156, 187)",
                        "rgb(255, 225, 53)",
                        "rgb(138, 43, 226)",
                        "rgb(178, 132, 190)",
                        "rgb(141, 182, 0)",
                        "rgb(211, 33, 45)",
                    ],
                    hoverOffset: 4,
                }, ],
            },
            options: {
                plugins: {
                    legend: {
                        position: 'right',
                        display: true,
                        align: 'center',
                        fullSize: false,
                    },
                },
            },
        });
        myBarChart;
        myPieChart;
    },
};
</script>

<style></style>
