
<template>
<div class="main-page flex justify-center items-center p-10">
    <div class=" card justify-center items-center space-x-3 bg-brand-white shadow-lg rounded-lg m-3 p-6">
        <div class="card-body">
            <div class="flex flex-row">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"/></svg>
                </div>
                <h2 class="card-title pl-3">ADD HEI ACCOUNT</h2>
            </div>
            <div class="line"></div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">HEI Name</span>
                </label>
                <input type="text" placeholder="Enter HEI’s name" class="input input-bordered w-full" required v-model="hei_name"/>
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Username</span>
                </label>
                <input type="text" placeholder="Enter username" class="input input-bordered w-full" required v-model="username"/>
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Address</span>
                </label>
                <input type="text" placeholder="Enter address" class="input input-bordered w-full" required v-model="address"/>
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Contact Number</span>
                </label>
                <input type="text" placeholder="09*********" class="input input-bordered w-full" required v-model="number"/>
            </div>
            <div class="flex flex-row">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Institutional Code</span>
                    </label>
                    <input type="text" placeholder="Enter Code" class="input input-bordered" style="width: 170px" required v-model="inst_code"/>
                </div>

                <div class="form-control w-full pl-4">
                    <label class="label">
                        <span class="label-text">HEI Type:</span>
                        <span class="label-text"><a>+ Add Designation</a></span>
                    </label>
                    <select class="select select-bordered w-full" required v-model="hei_type">
                        <option v-for="hei in heis" :key="hei">
                            <div class="hei-name" >{{ hei.title }}</div>
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex flex-row pt-5">
                <button class="btn btn-margin btn-wide btn-outline">Cancel</button>
                <button class="btn btn-margin btn-wide  bg-brand-darkblue hover:bg-brand-blue" v-on:click="addHEI()">Add HEI</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Parse from 'parse'

Parse.initialize("capp", "master");
Parse.serverURL = 'http://localhost:1337/parse'

export default {
    name: "AddHeiView",
    data() {
        return {
            heis: [{
                    title: "STATE UNIVERSITIES AND COLLEGES",
                },
                {
                    title: "LOCAL UNIVERSITIES AND COLLEGES",
                },
                {
                    title: "PRIVATE COLLEGES",
                },
                {
                    title: "OTHER GOVERNMENT SCHOOLS",
                },
            ],
            hei_name: '',
            username: '',
            address: '',
            number: '',
            inst_code: '',
            hei_type: 'STATE UNIVERSITIES AND COLLEGES',
        };
    },
    methods:{
        addHEI(){
           
            
            const HEIAccount = Parse.Object.extend("HEIAccount");
            const newAccount = new HEIAccount();

            var has_error = 0;
            var error_text = "Account not created due to the following reasons:\n";

            if(this.hei_name == ''){
                has_error = 1;
                error_text += "HEI Name is empty\n"
            } 
            if(this.username == ''){
                has_error = 1;
                error_text += "Username is empty\n"
            } 
            if(this.address == ''){
                has_error = 1;
                error_text += "Address is empty\n"
            } 
            if(this.number == ''){
                has_error = 1;
                error_text += "Contact Number is empty\n"
            } 
            if(this.inst_code == ''){
                has_error = 1;
                error_text += "Institution Code is empty\n"
            } 

            if(has_error < 1){
            newAccount.save({
                hei_name: this.hei_name,
                username: this.username,
                address: this.address,
                number: this.number,
                inst_code: this.inst_code,
                hei_type: this.hei_type,
            })
            .then(
            (newAccount)=> {
                alert('Account Added Successfully ' + newAccount.id);
            }, 
            (error) => {
                alert('Account Adding Failed' + error);
            });}
            else{
                alert(error_text);
            }
            
            
        },
    },
    components: {},
};

</script>

<style>
.main-page {
    align-items: center;
}

.add-hei {
    width: 783px;
}

.line {
    border-width: 1px;
}

.btn-margin {
    margin-left: 10px;
    margin-right: 10px;
}
</style>
