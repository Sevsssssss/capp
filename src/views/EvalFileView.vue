<template>
<div class="" style="padding: 10px">
    <div class="flex flex-row m-5" style="justify-content: space-between;">
        <button class="center flex flex-row" @click="$router.go(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" /></svg>
            <div class="font-semibold">Back</div>
        </button>
        <div class="flex flex-row">

            <!-- add -->
            <button @click="editEvalIns()" class="
              btn btn-md
              bg-brand-darkblue
              hover:bg-brand-blue
              border-none
              p-2
              mr-2
            ">
                <div class="flex flex-row">
                    <svg class="mr-1" style="width: 24px; height: 24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                    </svg>
                    <div class="btn-text">EDIT</div>
                </div>
            </button>
            <button class="
              btn btn-md
              bg-brand-darkblue
              hover:bg-brand-blue
              border-none
              p-2
            ">
                <div class="flex flex-row">
                    <svg class="mr-1" style="width: 24px; height: 24px" viewBox="0 0 24 24">
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
    <div class="overflow-x-auto shadow-lg rounded-lg" style="margin: 11px">
        <div class="center m-10 flex flex-row">
            <div class="mr-10">
                <img src="../assets/img/CHED_logo.png" alt="ChedLogo" width="90px" height="90px">
            </div>
            <div>
                <div>
                    Republic of the Philippines
                </div>
                <div>
                    OFFICE OF THE PRESIDENT
                </div>
                <div>

                    COMMISSION ON HIGHER EDUCATION
                </div>
                <div class="font-bold">Regional Office V, Legazpi City</div>
            </div>
        </div>

        <div>
            <div>
                REVISED PROCESSING FORM FOR MONITORING AND EVALUATION
            </div>
            <div>
                per CMO 24, s.2015
            </div>

            <div>
                Description Here
            </div>

            <div class="overflow-x-auto">
                <table class="table eval-table w-full">
                    <!-- head -->
                    <thead class="bg-grey-500">
                        <tr>
                            <th></th>
                            <th class="aoe">Areas of Evaluation</th>
                            <th>Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr>
                            <th>1</th>
                            <td class="font-bold">PROGRAM ADMINISTRATION</td>
                            <td></td>
                        </tr>
                        <!-- row 2 -->
                        <tr>
                            <th></th>
                            <td class="font-medium">Presence of a clearly defined and organized administrative and instructional unit such as college, institute or department</td>
                            <td></td>
                        </tr>
                        <!-- row 3 -->
                        <tr>
                            <th></th>
                            <td class="font-medium">DEAN</td>
                            <td class="font-light">1. full-time <br>
                                2. holder of professional license for librarians <br>
                                3. holder of Master of Doctor of
                                Library and Information Science, or
                                With appropriate or related
                                Specialization (Information Systems,
                                Educ. Tech., Technology Mgmt. Info <br>
                                4. With at least 5 years of very
                                satisfactory teaching experience.
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td class="font-medium">DEPARTMENT CHAIR</td>
                            <td class="font-light">For initial program, a part-time program coordinator may be employed until such time that the program becomes economically viable.<br>

                                For LIS HEIs with big enrolment, an Assoc./ Assist. Dean/ Chair may be assigned

                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td class="font-medium">Teaching Load of the Dean/ Program </td>
                            <td class="font-light">max. of 12 units <br>
                                max. of 3 preparations

                            </td>
                        </tr>

                        <!-- row 1 -->
                        <tr>
                            <th>2</th>
                            <td class="font-bold">FACULTY</td>
                            <td></td>
                        </tr>
                        <!-- row 2 -->
                        <tr>
                            <th></th>
                            <td class="font-medium">ACADEMIC QUALIFICATIONS</td>
                            <td class="font-light">1. Faculty teaching the courses covered in the licensure exams must be holders of valid certificates of registration or professional license for librarians;
                                <br>
                                2. Majority of the faculty must be holders of appropriate MLIS or related degrees (e.g. Master in Info Systems, Ed. Tech, Archives Studies, Educ’l. Tech.) to teach LIS, ICT and/or allied courses (Records Mgmt.& Archives, Preservation of Info Resources, Philo and Principles of Teaching, Indigenous Peoples and Multiculturalism);
                                <br>
                                3. Faculty must have at least 2 years of library-related experience.
                                <br>
                                * A Practicum Coordinator who is a regular faculty in the college/department shall be assigned to plan, supervise and evaluate students’ practicum experience and provide career guidance.

                            </td>
                        </tr>
                        <!-- row 3 -->
                        <tr>
                            <th></th>
                            <td class="font-medium">CONDITIONS OF EMPLOYMENT</td>
                            <td class="font-light">1. Salary rates of faculty members shall be commensurate with their academic rank, academic preparation, experience in instruction and research, and comparable with those of other faculty members who teach other baccalaureate courses.
                                <br>
                                2. Maximum teaching load of LIS faculty is 24 units for full-timers and 12 units for part-timers, with a maximum of four (4) preparations and inclusive of research and other related assignments.
                                <br>
                                3. LIS faculty shall be assigned academic rank in accordance with their acad. Preparation, teaching experience and continuing professional growth, library and info science work experience, and other criteria which the HEIs may require.

                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td class="font-medium">FACULTY DEVELOPMENT</td>
                            <td class="font-light">
                                1. presence of a system of faculty development. The HEI should encourage faculty members to:

                                -complete doctoral degrees in LIS and other allied fields;
                                - undertake research activities reacted to librarianship and publish their research outputs in refereed journals;
                                - give lectures, conduct workshops and present papers in national/ international conferences, symposia and seminars;
                                - attend continuing education seminars, workshops, conferences and the like.

                                2. provision of opportunities and incentives, such as:
                                - tuition subsidy for graduate studies;
                                -study leave w/ pay;
                                -deloading to finish a thesis or carry out research activities;
                                -travel grants for academic dev’t. activities (special skills training, national/ international conferences, symposia and seminars;
                                - awards and recognition.

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'EvalFileView',
    components: {

    },
    methods: {
        editEvalIns() {
           this.$router.push("/evaluationins/add");
        }, 
    }
}
</script>
