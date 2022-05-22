<template>
<div class="bg-brand-lightblue/10 h-full">
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
    <div class="flex flex-row justify-evenly">
        <!-- Header -->

        <!-- FIRST BOX -->
        <div class="flex flex-col w-full p-8 m-5 bg-brand-white rounded-sm shadow-lg justify-evenly">
            <div class="flex flex-row items-center justify-between">
                <div>
                    <svg class="icon" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z" />
                    </svg>
                </div>
                <div class="flex flex-col items-end space-y-1">
                    <div class="text-3xl font-extrabold">12k</div>
                    <div class="label-s uppercase text-grey-400">
                        Higher Education Institutions
                    </div>
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
            <div></div>
        </div>
        <!-- SECOND BOX -->
        <div class="flex flex-col w-full p-8 my-5 bg-brand-white rounded-sm shadow-lg justify-evenly">
            <div class="flex flex-row items-center justify-between space-x-20">
                <div>
                    <svg class="icon" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z" />
                    </svg>
                </div>
                <div class="flex flex-col items-end space-y-1">
                    <div class="text-3xl font-extrabold">12k</div>
                    <div class="label-s uppercase text-grey-400">Total Account</div>
                </div>
            </div>
            <hr class="m-3" />
            <div class="">
                <div class="carousel w-full">
                    <div id="slide1-two" class="carousel-item relative w-full">
                        <div class="grid grid-cols-2 w-full divide-x">
                            <div class="">
                                <div class="font-bold text-lg">12</div>
                                <span class="label-s text-grey-400"> HEIs </span>
                            </div>
                            <div class="">
                                <div class="font-bold text-lg">123</div>
                                <span class="label-s text-grey-400"> RQAT </span>
                            </div>
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/4">
                            <a href="#slide2-two" class="text-grey-200">❮</a>
                            <a href="#slide2-two" class="text-grey-200">❯</a>
                        </div>
                    </div>
                    <div id="slide2-two" class="carousel-item relative w-full">
                        <div class="w-full">
                            <div class="font-bold text-lg">200</div>
                            <span class="label-s text-grey-400"> EMPLOYEES </span>
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/4">
                            <a href="#slide1-two" class="text-grey-200">❮</a>
                            <a href="#slide1-two" class="text-grey-200">❯</a>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
        <!-- THIRD BOX -->
        <div class="flex flex-col w-full p-8 m-5 bg-brand-white rounded-sm shadow-lg justify-evenly">
            <div class="flex flex-row items-center justify-between space-x-20">
                <div>
                    <svg class="icon" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 21H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9a1 1 0 0 1-1 1zM6 19h12V9.157l-6-5.454-6 5.454V19z" />
                    </svg>
                </div>
                <div class="flex flex-col items-end space-y-1">
                    <div class="text-3xl font-extrabold">12k</div>
                    <div class="label-s uppercase text-grey-400">
                        Total Applications
                    </div>
                </div>
            </div>
            <hr class="m-3" />
            <div class="">
                <div class="carousel w-full">
                    <div id="slide1-three" class="carousel-item relative w-full">
                        <div class="grid grid-cols-2 w-full divide-x">
                            <div class="">
                                <div class="font-bold text-lg">12</div>
                                <span class="label-s text-grey-400"> APPROVAL </span>
                            </div>
                            <div class="">
                                <div class="font-bold text-lg">123</div>
                                <span class="label-s text-grey-400"> REVISION </span>
                            </div>
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/4">
                            <a href="#slide3-three" class="text-grey-200">❮</a>
                            <a href="#slide2-three" class="text-grey-200">❯</a>
                        </div>
                    </div>
                    <div id="slide2-three" class="carousel-item relative w-full">
                        <div class="grid grid-cols-2 w-full divide-x">
                            <div class="">
                                <div class="font-bold text-lg">12</div>
                                <span class="label-s text-grey-400"> EVALUATION </span>
                            </div>
                            <div class="">
                                <div class="font-bold text-lg">123</div>
                                <span class="label-s text-grey-400"> ISSUANCE </span>
                            </div>
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/4">
                            <a href="#slide1-three" class="text-grey-200">❮</a>
                            <a href="#slide3-three" class="text-grey-200">❯</a>
                        </div>
                    </div>
                    <div id="slide3-three" class="carousel-item relative w-full">
                        <div class="w-full">
                            <div class="font-bold text-lg">200</div>
                            <span class="label-s text-grey-400"> COMPLETED </span>
                        </div>
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/4">
                            <a href="#slide2-three" class="text-grey-200">❮</a>
                            <a href="#slide1-three" class="text-grey-200">❯</a>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    </div>
    <div class="flex justify-start items-center ">
         <div class="h-1/2 w-1/2 p-4 m-5 rounded-sm shadow-lg bg-brand-white">
                <canvas id="myBarChart"></canvas>
            </div>
        <div class="h-1/2 w-1/4 ml-40">
            <canvas id="myPieChart"></canvas>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
import Chart from 'chart.js/auto';

export default {
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
        const ctx = document.getElementById('myBarChart');
        const ctxPie = document.getElementById('myPieChart');
        const myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
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
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        const myPieChart = new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            },
        });
        myBarChart;
        myPieChart;
    },
};
</script>

<style></style>
