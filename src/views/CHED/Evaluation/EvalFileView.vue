<template>
<div class="m-3">
    <div class="flex flex-row p-2 justify-end">
        <!-- <button class="flex flex-row" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
            </svg>
            <div class="font-semibold text-grey-300">Back</div>
        </button> -->
        <div class="flex space-x-2 pr-2">
            <!-- add -->
            <button @click="editEvalIns()" class="btn btn-md bg-brand-darkblue hover:bg-brand-blue border-none">
                <div class="flex flex-row">
                    <svg class="mr-1" style="width: 20px; height: 20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                    </svg>
                    <div class="btn-text">EDIT</div>
                </div>
            </button>
            <button class="btn btn-md bg-brand-darkblue hover:bg-brand-blue border-none">
                <div class="flex flex-row">
                    <svg class="mr-1" style="width: 20px; height: 20px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                    <div class="btn-text">DELETE</div>
                </div>
            </button>
        </div>
    </div>

    <!-- <div class="flex space-x-10 text-left center">
        <div class="">
            <img src="../assets/img/CHED_logo.png" alt="ChedLogo" width="90px" height="90px">
        </div>
        <div class="">
            <div class="font-bold" style="width: 490px;"> COMMISION ON HIGHER EDUCATION OFFICE OF PROGRAMS AND STANDARDS MONITORING INSTRUMENT FOR UNDERGRADUATE ACADEMIC PROGRAMS</div>
        </div>
    </div> -->
    <div class="overflow-x-auto shadow-lg rounded-lg m-3 p-5">
        <div class="flex flex-row justify-center items-center space-x-4">
            <div class="">
                <img src="@/assets/img/CHED_logo.png" class="h-28 w-28" />
            </div>
            <div class="text-left">
                <div class="text-xl font-semibold">Republic of the Philippines</div>
                <div class="">OFFICE OF THE PRESIDENT</div>
                <div class="">COMMISSION ON HIGHER EDUCATION</div>
                <div class="">Regional Office V, Legazpi City</div>
            </div>
        </div>
        <div class="text-center p-5">
            <div class="font-semibold">
                REVISED PROCESSING FORM FOR MONITORING AND EVALUATION
            </div>
            <div>{{evalDesc}}</div>
            <div>per CMO {{cmoNo}}, s.{{seriesYear}}</div>
            <div>Description Here</div>
        </div>
        <div class="">
            <div class="overflow-x-auto">
                <table class="table eval-table w-full">
                    <tbody>
                        <!-- row 1 -->
                        <div v-for="cat in categories" :key="cat">
                            <th>{{cat.id}}</th>
                            <td class="font-bold">{{cat.Category}}</td>
                            <div v-for="subcat in cat.subcategory" :key="subcat">
                                <td></td>
                                <th>{{cat.id}}.{{subcat.id}}</th>
                                <td class="font-medium">{{subcat.Subcategory}}</td>
                                <div v-for="item in subcat.items" :key="item">
                                    <td></td>
                                    <td></td>
                                    <th>{{cat.id}}.{{subcat.id}}.{{item.id}}</th>
                                    <td class="font-thin">{{item.Item}}</td>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "EvalFileView",
    components: {},
    data() {
        return {
            categories: [{
                "id": 1,
                "subcategory": [{
                    "id": 1,
                    "items": [],
                    "Subcategory": "A doctoral degree holder in Education or a related field"
                }, {
                    "id": 2,
                    "items": [],
                    "Subcategory": "Holder of a valid certificate of registration and updated professional license (PRC ID) as provided in Section 11 of RA 8981."
                }, {
                    "id": 3,
                    "items": [],
                    "Subcategory": "Employed full - time. "
                }, {
                    "id": 4,
                    "items": [],
                    "Subcategory": "With at least three (3) years of very satisfactory teaching experience in tertiary level."
                }, {
                    "id": 5,
                    "items": [],
                    "Subcategory": "With at least three (3) years of very satisfactory teaching experience in either the elementary or secondary level"
                }, {
                    "id": 6,
                    "items": [],
                    "Subcategory": "With at least 2 years of very managerial/administrative experience"
                }, {
                    "id": 7,
                    "items": [],
                    "Subcategory": "With updated notarized contract of employment"
                }],
                "Category": "DEAN OR DEPARTMENT CHAIR",
                "Desc": "(CMO 76, s. 2017), and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)"
            }, {
                "id": 2,
                "subcategory": [{
                    "id": 1,
                    "items": [{
                        "id": 1,
                        "Item": "As a rule, a Master’s Degree in education or an allied disciplined is required for teaching in the tertiary level, and RA 7836 & RA 9293 (Philippine Teachers Professionalization Act of 1994) and RA 8981 (PRC Modernization Act of 2000)"
                    }, {
                        "id": 2,
                        "Item": "Faculty teaching general education and major subjects should have an appropriate master’s degree in the field they are assigned to teach."
                    }, {
                        "id": 3,
                        "Item": "Physical Education Teacher"
                    }, {
                        "id": 4,
                        "Item": "Teacher has a BS P.E. degree or BEEd/ BSEd major/minor in P.E. or any other bachelor's degree with certificate in P.E."
                    }, {
                        "id": 5,
                        "Item": "Holder of a valid certificate of registration and updated professional license (PRC ID) as provided in Section 11 of RA 8981."
                    }, {
                        "id": 6,
                        "Item": "With updated notarized contract of employment"
                    }],
                    "Subcategory": "General Requirements"
                }, {
                    "id": 2,
                    "items": [{
                        "id": 1,
                        "Item": "Holder of a valid certificate of registration and updated professional license (PRC ID) as provided in Section 11 of RA 8981."
                    }, {
                        "id": 2,
                        "Item": "Holder of Master’s degree in education or any of the allied fields"
                    }],
                    "Subcategory": "Qualifications of the Professional Education Faculty"
                }],
                "Category": "FACULTY"
            }],
            programName: "Bachelor of Early Childhood Education (BECEd",
            cmoNo: "76",
            seriesYear: "2017",
            evalDesc: "EVALUATION FORM FOR BACHELOR OF EARLY CHILDHOOD EDUCATION (BECED)",
        };
    },
    methods: {
        editEvalIns() {
            this.$router.push("/evaluationins/add");
        },
    },
};
</script>
