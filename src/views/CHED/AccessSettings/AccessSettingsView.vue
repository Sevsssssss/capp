<template>
<!-- <div v-if="!tables.length" style="height: 100%">
    <NoDataAvail names="AccessTypesView" />
</div> -->
<div>
    <div class="p-3">
        <!-- Table -->
        <div class="overflow-x-auto shadow-lg rounded-lg m-2">
            <!-- Table header -->
            <div class="flex flex-row justify-between items-center">
                <!-- Search -->
                <div class="flex space-x-4 pl-5 py-4">
                    <div class="mr-5">
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative mt-1">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <input v-model="search" type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5" placeholder="Search for items" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-row">
                    <!-- button -->
                    <div class="h-fit pr-5 pt-3 items-center">
                        <label @click="reset()" type="button" for="createAccessType" class="flex items-center text-white bg-brand-darkblue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 focus:outline-none">
                            <svg style="fill: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                            </svg>
                            <div class="pl-2">Add Access Type</div>
                        </label>
                    </div>
                </div>
            </div>
            <!-- Table body -->
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3" v-for="header in headers" :key="header">
                            {{ header.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in searchAccessType" :key="i" class="bg-white border-b">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ i.Name }}
                        </td>
                        <td scope="row" class="px-6 py-4 font-medium spacer text-gray-900">
                            <span class="bg-blue-100 text-xs mr-2 p-2 rounded"> {{ i.Privileges }}</span>
                        </td>
                        <td v-if="i.Name != 'SUPER ADMIN'" class="px-6 py-4 text-right">
                            <label for="editAccessType" @click="changeSelectedAT(i.id, i.Name)" class="font-medium text-blue-600 hover:underline">Edit</label>
                        </td>
                        <td v-if="i.Name != 'SUPER ADMIN'" class="px-6 py-4">
                            <label for="deleteFunc" class="hover:text-brand-red/60">
                                <svg style="width: 20px; height: 20px" viewBox="0 0 24 24" @click="selectedAccessDelete(i.id)">
                                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                </svg>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="searchAccessType.length == 0" class="p-5 font-medium">
                <!-- NO DATA FOUND {{search}} -->
                Sorry, the keyword "{{ search }}" cannot be found in the database.
            </div>
            <!-- Table Footer -->
            <div class="table-footer flex flex-row justify-between">
                <div class="flex flex-row pl-4 justify-center items-center">
                    <span class="text-sm text-gray-700">
                        Showing
                        <span class="font-semibold text-gray-900">{{
                1 + numPerPage * currentpage
              }}</span>
                        to
                        <span class="font-semibold text-gray-900">{{
                (currentpage + 1) * numPerPage > totalEntries
                  ? totalEntries
                  : (currentpage + 1) * numPerPage
              }}</span>
                        of
                        <span class="font-semibold text-gray-900">{{
                totalEntries
              }}</span>
                        Entries
                    </span>
                </div>
                <div class="p-2 pr-4">
                    <div class="btn-group">
                        <ul class="inline-flex -space-x-px">
                            <li>
                                <a href="javascript:void(0)" class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="prevPage()">Previous</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" @click="nextPage()">Next</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <input type="checkbox" id="createAccessType" class="modal-toggle" />
        <label for="createAccessType" class="modal cursor-pointer">
            <div class="modal-box relative  w-11/12 max-w-5xl rounded-md text-left">

                <div class="font-semibold text-md">ADD ACCESS TYPES</div>
                <p class="py-2 text-sm">Input the name and choose its priviliges</p>
                <form v-on:submit.prevent="submit">
                    <div class="mb-6">

                        <div class="font-medium text-sm mt-2">
                            <label for="base-input" class="block pb-2 text-sm font-medium text-gray-900">Access Type:</label>
                            <input type="text" :class="{ 'input-error': validationStatus(v$.atname) }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-6" placeholder="Enter Name" v-model="v$.atname.$model" />
                            <div class="pb-2">CHED Privileges:</div>
                            <div class="grid xxl:grid-cols-3 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 xxs:grid-cols-1 text-left">
                                <label class="flex flex-row cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/application" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Application
                                    </div>
                                </label>
                                <label class="flex flex-row cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/application:id" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Application Status
                                    </div>
                                </label>

                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/hei" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        HEIs Account
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/hei/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add HEI
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/hei/upload" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Upload HEI Accounts
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/rqat" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        RQAT Account
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/rqat-assignment" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        RQAT Evaluation
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/rqat/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add RQAT
                                    </div>
                                </label>
                                <label class="flex flex-row cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/employees" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Employees
                                    </div>
                                </label>
                                <label class="flex flex-row cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/employees/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add Employees
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/evaluationins" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Evaluation Ins.
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/evaluationins/:id" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Evaluation Ins. View
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/evaluationins/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Evaluation Ins. Add
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/reporting" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Reporting
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/app-settings" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Application Types
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/app-settings/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add Application Type
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/app-settings/edit" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Edit Application Type
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/app-settings/view" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        View Application Type
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/access-settings" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Access Types
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/heiTypes" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Hei Types
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/designations" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Designations
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/disciplines" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Disciplines
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/cmo" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Ched Memorandum Order
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/cmo/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add Ched Memorandum Order
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/cmo/edit" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Edit Ched Memorandum Order
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/programs" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Programs
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/ched/account" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Account
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/notif" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Notif
                                    </div>
                                </label>

                            </div>
                        </div>

                    </div>
                </form>
                <div class="modal-action">
                    <label for="createAccessType" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                    <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="modal()">Submit</label>
                </div>
            </div>
        </label>

        <input type="checkbox" id="editAccessType" class="modal-toggle" />
        <label for="editAccessType" class="modal cursor-pointer">
            <div class="modal-box relative  w-11/12 max-w-5xl rounded-md text-left">

                <div class="font-semibold text-md">EDIT ACCESS TYPES</div>
                <p class="py-2 text-sm">Input the name and choose its priviliges</p>
                <form v-on:submit.prevent="submit">
                    <div class="mb-6">

                        <div class="font-medium text-sm mt-2">
                            <label for="base-input" class="block pb-2 text-sm font-medium text-gray-900">Access Type:</label>
                            <input type="text" :class="{ 'input-error': validationStatus(v$.atname) }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-6" placeholder="Enter Name" v-model="v$.atname.$model" />
                            <div class="pb-2">CHED Privileges:</div>
                            <div class="grid xxl:grid-cols-3 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 xxs:grid-cols-1 text-left">
                                <label class="flex flex-row cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/application" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Application
                                    </div>
                                </label>
                                <label class="flex flex-row cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/application:id" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Application Status
                                    </div>
                                </label>

                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/hei" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        HEIs Account
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/hei/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add HEI
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/hei/upload" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Upload HEI Accounts
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/rqat" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        RQAT Account
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/rqat-assignment" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        RQAT Evaluation
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/rqat/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add RQAT
                                    </div>
                                </label>
                                <label class="flex flex-row cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/employees" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Employees
                                    </div>
                                </label>
                                <label class="flex flex-row cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/employees/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add Employees
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/evaluationins" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Evaluation Ins.
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/evaluationins/:id" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Evaluation Ins. View
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/evaluationins/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Evaluation Ins. Add
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/reporting" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Reporting
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/app-settings" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Application Types
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/app-settings/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add Application Type
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/app-settings/edit" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Edit Application Type
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/app-settings/view" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        View Application Type
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/access-settings" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Access Types
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/heiTypes" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Hei Types
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/designations" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Designations
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/disciplines" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Disciplines
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/cmo" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Ched Memorandum Order
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/cmo/add" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Add Ched Memorandum Order
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/cmo/edit" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Edit Ched Memorandum Order
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/programs" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Programs
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/ched/account" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Account
                                    </div>
                                </label>
                                <label class="flex flex-row viewSubCatbool cursor-pointer p-1" style="align-items: center">
                                    <input type="checkbox" class="checkbox mr-1" value="/notif" v-model="checkedAccessTypes" />
                                    <div class="label-text viewSubCatbool" style="align-self: center">
                                        Notif
                                    </div>
                                </label>

                            </div>
                        </div>

                    </div>
                </form>
                <div class="modal-action">
                    <label for="editAccessType" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                    <label for="my-modal-6" id="my-modal-6" type="submit" class="btn btn-sm bg-blue-700 rounded-md hover:bg-blue-800 border-none" @click="modal1()">Submit</label>
                </div>
            </div>
        </label>
        <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
        <div :class="{ 'modal-open ': validate() }" class="modal">
            <div class="modal-box relative rounded-md text-left">
                <div class="font-semibold text-md">Grant Access</div>
                <p class="text-sm xxs:leading-tight text-grey-200">
                    Are you sure you want to grant access?
                </p>
                <div class="modal-action">
                    <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal()">Cancel</label>
                    <label class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="addAccessType()">Continue</label>
                </div>
            </div>
        </div>

        <div :class="{ 'modal-open ': validate1() }" class="modal">
            <div class="modal-box relative rounded-md text-left">
                <div class="font-semibold text-md">Edit Access</div>
                <p class="text-sm xxs:leading-tight text-grey-200">
                    Are you sure you want to edit access?
                </p>
                <div class="modal-action">
                    <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white" @click="modal1()">Cancel</label>
                    <label class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="editAccessType()">Continue</label>
                </div>
            </div>
        </div>

    </div>
    <input type="checkbox" id="deleteFunc" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">Delete Access Type</div>
            <p class="py-2 text-sm">
                This action cannot be undone. Are You sure you want to delete this access type?
            </p>
            <div class="modal-action">
                <label for="deleteFunc" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="deleteFunc" class="btn btn-sm bg-red-500 hover:bg-red-600 rounded-md border-none" @click="deleteAT()">Delete</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from "parse";
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import {
    required
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
const toast = useToast();
// import NoDataAvail from "@/components//NoDataAvail.vue";
// var dataNumber = 10;
// var page = 0;
export default {
    name: "AccessTypesView",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            deleteAccess: '',
            showModal1: false,
            showModal2: false,
            v$: useVuelidate(),
            currentpage: 0,
            numPerPage: 10,
            totalEntries: 0,
            headers: [{
                    title: "ACCESS TYPE",
                },
                {
                    title: "Privileges",
                },
            ],
            tables: [],
            search: "",
            sort_type: "Sort by Designation",
            atname: "",
            checkedAccessTypes: [],
            homeType: "",
            selectedAT: "",
        };
    },
    validations() {
        return {
            atname: {
                required,
            },
        };
    },

    computed: {
        searchAccessType() {
            return this.tables
                .filter((p) => {
                    return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
                })
                .slice(
                    this.numPerPage * this.currentpage,
                    (this.currentpage + 1) * this.numPerPage
                );
        },
    },
    methods: {
        reset() {
            this.checkedAccessTypes = [];
        },
        async editAccessType() {
            //Query Access Type
            const AccessTypes = Parse.Object.extend("AccessTypes");
            const atQuery = new Parse.Query(AccessTypes);
            atQuery.equalTo("objectId", this.selectedAT);

            const accessType = await atQuery.first();

            console.log(this.selectedAT);
            //Save Changes to Access Type
            try {
                accessType.save({
                    name: this.atname.toUpperCase(),
                    hometype: '/home',
                    privileges: this.checkedAccessTypes,
                });

                toast("Access Type Updated", {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    // window.location.reload()
                    setTimeout(() => {
                        document.location.reload();
                    }, 2000);
            } catch (error) {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error.message)
            }
        },
        selectedAccessDelete(id) {
            this.deleteAccess = id;
        },
        async deleteAT() {
            //Query Access Type
            const AccessTypes = Parse.Object.extend("AccessTypes");
            const atQuery = new Parse.Query(AccessTypes);
            atQuery.equalTo("objectId", this.deleteAccess);

            const accessType = await atQuery.first();

            //Delete Access Type
            accessType.destroy().then(
                (accType) => {
                    toast("Deleting...", {
                        type: TYPE.WARNING,
                        timeout: 3000,
                        hideProgressBar: false,
                        position: POSITION.TOP_RIGHT,
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000);
                    console.log("Deleted object: " + accType.id);
                },
                (error) => {
                    toast("Error:" + error.message, {
                        type: TYPE.ERROR,
                        timeout: 3000,
                        hideProgressBar: true,
                        position: POSITION.TOP_RIGHT,
                    });
                    console.log("Error: " + error);
                }
            );
        },
        validationStatus: function (validation) {
            return typeof validation !== "undefined" ? validation.$error : false;
        },
        submit: function () {
            this.v$.$touch();
            if (!this.v$.$pending || !this.v$.$error) return;
        },
        validate() {
            return this.showModal1;
        },
        validate1() {
            return this.showModal2;
        },
        async changeSelectedAT(atID, atName) {
            //For Selecting Access Type to delete or edit
            this.selectedAT = atID;
            this.atname = atName;

            const ACCESSTYPES = Parse.Object.extend("AccessTypes");
            const accQuery = new Parse.Query(ACCESSTYPES);
            accQuery.equalTo("objectId", this.selectedAT);

            const accesstype = await accQuery.first();

            this.checkedAccessTypes = accesstype.get("privileges");
        },
        modal1() {
            var has_error = 0;
            if (this.atname == "") {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal2 = !this.showModal2;
            }
        },
        modal() {
            var has_error = 0;
            if (this.atname == "") {
                toast("Please fill out the required information", {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                has_error = 1;
            }
            if (has_error < 1) {
                this.showModal1 = !this.showModal1;
            }
        },
        addAccessType() {
            this.$refs.Spinner.show();
            //Get Access Type Class
            const accessType = Parse.Object.extend("AccessTypes");
            const newAccessType = new accessType();

            //Save new Access Type
            newAccessType.save({
                    name: this.atname.toUpperCase(),
                    hometype: '/home',
                    privileges: this.checkedAccessTypes,
                }).then(() => {
                    toast("Access Type Added", {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    }),
                    // window.location.reload()
                    setTimeout(() => {
                        document.location.reload();
                    }, 2000);
                }, (error) => {
                    if(this.atname == "" || this.atname == undefined){
                        toast("Please fill out required information.", {
                            type: TYPE.ERROR,
                            timeout: 3000,
                            hideProgressBar: true,
                            position: POSITION.TOP_RIGHT,
                        });
                    }
                    else{
                        toast(error.message, {
                            type: TYPE.ERROR,
                            timeout: 3000,
                            hideProgressBar: true,
                            position: POSITION.TOP_RIGHT,
                        });
                    }
                    setTimeout(() => {
                        document.location.reload();
                    }, 2000);
                    console.log(error.message)
                });

        },

        //For table page traversal
        newEntCount() {
            this.totalEntries = this.tables.filter((p) => {
                return p.Name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            }).length;
        },
        prevPage() {
            if (this.currentpage > 0) this.currentpage -= 1;
        },
        nextPage() {
            if ((this.currentpage + 1) * this.numPerPage < this.totalEntries) {
                this.currentpage += 1;
            }
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

            //Query Access Types
            var accessTypesTable = [];
            const AccessTypes = Parse.Object.extend("AccessTypes");
            const query = new Parse.Query(AccessTypes);
            const querResult = await query.find();

            //Store Access Types Data
            for (var i = 0; i < querResult.length; i++) {
                const accessType = querResult[i];
                var accessPriv = "";
                for (var x = 0; x < accessType.get("privileges").length; x++) {
                    var accessPrivIndex = accessType.get("privileges")[x];
                    if (accessPriv === "") {
                        accessPriv = accessPriv + accessPrivIndex;
                    } else {
                        accessPriv = accessPriv + ", " + accessPrivIndex;
                    }
                }
                accessTypesTable.push({
                    id: accessType.id,
                    Name: accessType.get("name"),
                    Privileges: accessPriv,
                });
            }
            this.totalEntries = querResult.length;
            this.tables = accessTypesTable;
        }
    },
};
</script>

<style></style>
