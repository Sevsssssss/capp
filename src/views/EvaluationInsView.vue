<template>
<div class="">
 <table class="table-normal  m-5 w-full bg-brand-white shadow-lg rounded-lg text-left">
    <!-- head -->
    <thead>
        <tr>
            <th>
                <div class="form-control">
                    <div class="input-group">
                        <input type="text" placeholder="Search…" class="input input-bordered" />
                        <button class="btn btn-square bg-brand-darkblue hover:bg-blue-100 border-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </th>
            <!-- Date Picter -->
            <th>
              Date Picker uwu
            </th>
             <th>
            </th>
             <th>
            </th>
            <th class="flex">
                <button @click="addHei()" class="btn btn-primary bg-brand-darkblue hover:bg-blue-100 border-none">
                    <div class="flex flex-row justify-center items-center space-x-2 ">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22M12,7L7,12H10V16H14V12H17L12,7Z" />
                        </svg>
                        <div>
                            ADD HEI
                        </div>
                    </div>
                </button>
            </th>
        </tr>
    </thead>
    <!-- head-body -->
    <thead class="bg-grey-500">
        <tr class="">
            <th class="font-semibold text-grey-200">
               CMO
            </th>
             <th class="font-semibold text-grey-200">
               Description
            </th>
            <th></th>
            <th></th>
             <th class="font-semibold text-grey-200">
               Action
            </th>
        </tr>
    </thead>
    <tbody>
        <!-- row 1 -->
        <tr class="" v-for="table in tables" :key="table">
            <th class="font-normal ">{{ table.InstNo }}</th>
            <td>
                <div class="font-normal text-grey-300">{{ table.HeiName }}</div>
            </td>
            <td></td>
            <td></td>
            <td>
                <div class="flex flex-row justify-start items-start space-x-2">
                    <a class="link link-primary text-brand-darkblue hover:text-brand-blue pr-2">view</a> 
                    <div class="text-grey-200 hover:text-brand-blue">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                        </svg>
                    </div>
                    <div class="text-grey-200 hover:text-brand-blue">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </div>
                </div>  
            </td>
            <td></td>
           
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <th class="font-normal text-sm">TOTAL HEI: 40/100</th>
            <th></th>
            <th></th>
            <th>
                <div class="flex flex-row justify-center items-center">
                    <div class="font-normal text-sm">Rows per page: 10</div>
                    <div class="text-grey-200 hover:text-brand-blue">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                        </svg>
                    </div>
                </div>
            </th>
            <th>
                <div class="flex flex-row justify-center items-center font-normal text-sm">
                    <p>1-10 of 276</p>
                    <div class="text-grey-200 hover:text-brand-blue">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                        </svg>
                    </div>
                    <div class="text-grey-200 hover:text-brand-blue">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                        </svg>

                    </div>

                </div>
            </th>
        </tr>
    </tfoot>
</table></div>
</template>

<script>

export default {
  name: 'EvaluationInsView',
  components: {
  },
  data() {
     return{
       headers: [{
                    title: "CMO",
                },
                {
                    title: "Decription",
                },
                {
                    title: "Action",
                },
            ],
            tables: [{
                    InstNo: "1",
                    HeiName: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    InstNo: "2",
                    HeiName: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                  InstNo: "2",
                    HeiName: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    InstNo: "2",
                    HeiName: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
                {
                    InstNo: "3",
                    HeiName: "Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit quaerendum.",
                },
            ],
     }
  }
}
</script>
