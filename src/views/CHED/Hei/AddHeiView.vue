<template>
<div class="overflow-x-auto flex justify-center items-center p-5">
    <div class="p-4 w-fit bg-white rounded-lg border border-gray-100 shadow-lg">
        <!-- {{hei_types}} -->
        <form v-on:submit.prevent="submit" class="card-body">
            <div class="flex flex-row space-x-4 text-left justify-start items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
                </svg>
                <span class="text-2xl font-semibold text-grey-100">ADD HEI ACCOUNT</span>
            </div>
            <hr class="border w-full" />
            <div class="flex">
                <div class="form-control w-full pr-4">
                    <label class="label">
                        <span class="label-text">HEI Name</span>
                    </label>
                    <input type="text" placeholder="Enter HEI’s name" :class="{ 'input-error': validationStatus(v$.hei_name) }" class="input input-bordered w-full" v-model="v$.hei_name.$model" />
                    <!-- <label class="label">
                    <span v-if="validationStatus(v$.hei_name)" :class="{ 'text-error': validationStatus(v$.hei_name) }" class="label-text-alt">
                        HEI Name is Required</span>
                </label> -->
                </div>
                <div class="form-control w-fit">
                    <label class="label">
                        <span class="label-text">Username</span>
                    </label>
                    <input type="text" placeholder="Enter username" :class="{ 'input-error': validationStatus(v$.username) }" class="input input-bordered w-full" v-model="v$.username.$model" />
                    <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.username) }" v-if="validationStatus(v$.username)">
                        Username is Required</span>
                </label> -->
                </div>
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="email" placeholder="Enter Email" :class="{ 'input-error': validationStatus(v$.email) }" class="input input-bordered w-full" v-model="v$.email.$model" />
                <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.email) }" v-if="validationStatus(v$.email)">
                        Email is Required</span>
                </label> -->
            </div>

            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Contact Number</span>
                </label>
                <input type="text" placeholder="09*********" :class="{ 'input-error': validationStatus(v$.number) }" class="input input-bordered w-full" v-model="v$.number.$model" />
                <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.number) }" v-if="validationStatus(v$.number)">
                        Contact Number is Required</span>
                </label> -->
            </div>

            <div class="flex items-center my-4">
                <label class="block text-dark-200 text-sm mr-5"> Address </label>
                <hr class="border border-light-400 w-full" />
            </div>
            <div class="grid grid-cols-2 gap-5">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text" for="region">Region:</span>
                    </label>
                    <select class="select select-bordered w-full font-normal" name="region" @change="handleProvince" v-model="regionCode" required>
                        <option value="" disabled selected>Select Region</option>
                        <option v-for="region in regions" :value="region.region_code" :key="region.region_code">
                            {{ region.region_name }}
                        </option>
                    </select>
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text" for="city">Province:</span>
                    </label>
                    <select class="select select-bordered w-full font-normal" name="province" @change="handleCity" v-model="provinceCode" required>
                        <option value="" disabled selected>Select Province</option>
                        <option v-for="province in provinces" :value="province.province_code" :key="province.province_code">
                            {{ province.province_name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-5">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text" for="city">City:</span>
                    </label>
                    <select class="select select-bordered w-full font-normal" name="city" @change="handleBarangay" v-model="cityCode" required>
                        <option value="" disabled selected>Select City</option>
                        <option v-for="city in cities" :value="city.city_code" :key="city.city_code">
                            {{ city.city_name }}
                        </option>
                    </select>
                </div>

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text" for="barangay">Barangay:</span>
                    </label>
                    <select class="select select-bordered w-full font-normal" name="barangay" @change="barangaysChange" v-model="barangayCode" required>
                        <option value="" disabled selected>Select Barangay</option>
                        <option v-for="barangay in barangays" :value="barangay.brgy_code" :key="barangay.brgy_code">
                            {{ barangay.brgy_name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Street:</span>
                </label>
                <input type="text" placeholder="Enter address" class="input input-bordered w-full" v-model="street" />
                <!-- <label class="label">
                    <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.address) }" v-if="validationStatus(v$.address)">
                        Address is Required</span>
                </label> -->
            </div>

            <hr class="border border-light-400 w-full my-4" />
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Institutional Code</span>
                </label>
                <input type="text" placeholder="Enter Code" :class="{ 'input-error': validationStatus(v$.inst_code) }" class="input input-bordered" v-model="v$.inst_code.$model" />
                <!-- <label class="label">
                            <span class="label-text-alt" :class="{ 'text-error': validationStatus(v$.inst_code) }" v-if="validationStatus(v$.inst_code)">
                                Institutional Code is Required</span>
                        </label> -->
            </div>
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">HEI Type:</span>
                </label>
                <select class="select select-bordered w-full font-normal" v-model="hei_type">
                    <option v-for="heiType in hei_types" :key="heiType" :value="heiType.id">
                        <div class="">{{ heiType.title }}</div>
                    </option>
                </select>
            </div>

            <div class="flex justify-end pt-4 space-x-4">
                <button class="btn btn-md btn-outline" @click="$router.go(-1)">
                    Cancel
                </button>

                <button for="my-modal-6" id="my-modal-6" type="submit" class="border-none btn btn-md submit bg-brand-darkblue hover:bg-blue-800" @click="modal(), scrollToTop()">
                    Add HEI
                </button>
            </div>
        </form>
    </div>
    <VueInstantLoadingSpinner ref="Spinner" color="#0E3385" spinnerStyle="pulse-loader" margin="4px" size="20px"></VueInstantLoadingSpinner>
    <div :class="{ 'modal-open ': validate() }" class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold">ADD HEI ACCOUNT</div>
            <p class="text-sm xxs:leading-tight text-grey-200">
                Are you sure you want to add this account?
            </p>
            <div class="modal-action">
                <label for="my-modal-6" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">Cancel</label>
                <label for="my-modal-6" type="submit" class="btn btn-sm bg-brand-darkblue hover:bg-blue-800 rounded-md border-none" @click="addHEI(), scrollToTop()">
                    Continue
                </label>
            </div>
        </div>
    </div>
    <!-- <div  :class="{ 'modal-open': showaddAgain() }" class="modal">
        <div class="modal-box relative rounded-md text-left">
            <div class="font-semibold text-md">ADD ANOTHER ACCOUNT</div>
            <p class="py-2 text-sm">
                Would you like to add another account?
            </p>
            <div class="modal-action">
                <label for="addAgain" @click="this.$router.push('/hei')" class="btn btn-sm rounded-md text-blue-700 bg-transparent border border-blue-700 hover:bg-white">CANCEL</label>
                <label @click="document.location.reload()" class="btn btn-sm bg-blue-700 hover:bg-blue-800 rounded-md border-none">ADD</label>
            </div>
        </div>
    </div> -->
</div>

<!-- Add HEI Type -->
</template>

<script>
import {
    useToast,
    TYPE,
    POSITION
} from "vue-toastification";
import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner";
import Parse from "parse";
import useVuelidate from "@vuelidate/core";
import {
    required,
    email
} from "@vuelidate/validators";
const toast = useToast();
export default {
    name: "AddHeiView",
    components: {
        VueInstantLoadingSpinner,
    },
    data() {
        return {
            showModal: false,
            showModal1: false,
            savingSuccessful: false,
            addAgain: false,
            text: "Account added!",
            v$: useVuelidate(),
            hei_types: [{
                title: "None",
            }, ],
            hei_name: "",
            username: "",
            email: "",
            address: {},
            number: "",
            inst_code: "",
            hei_type: "None",
            hei_nameError: "",
            usernameError: "",
            emailError: "",
            addressError: "",
            numberError: "",
            inst_codeError: "",
            hei_typeError: "",
            hei_acc_id: "",
            regions: [],
            provinces: [],
            cities: [],
            barangays: [],
            regionCode: null,
            provinceCode: null,
            cityCode: null,
            barangayCode: null,
            region: null,
            regionNo: null,
            regionName: null,
            province: null,
            city: null,
            barangay: null,
            street: null,
        };
    },
    validations() {
        return {
            hei_name: {
                required,
            },
            username: {
                required,
            },
            email: {
                required,
                email,
            },
            
            number: {
                required,
            },
            inst_code: {
                required,
            },
            hei_type: {
                required,
            },
        };
    },

    methods: {
        //For HEI Address
        handleProvince(e) {
            this.regionName = e.target.selectedOptions[0].text;
            this.regionNo = e.target.value;
            provinces(e.target.value).then((response) => {
                this.provinces = response;
            });
        },
        handleCity(e) {
            this.province = e.target.selectedOptions[0].text;
            cities(e.target.value).then((response) => {
                this.cities = response;
            });
        },
        handleBarangay(e) {
            this.city = e.target.selectedOptions[0].text;
            barangays(e.target.value).then((response) => {
                this.barangays = response;
            });
        },
        barangaysChange(e) {
            this.barangay = e.target.selectedOptions[0].text;
        },
        //For Validation
        ToggleshowModal() {
            this.showModal = !this.showModal;
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
        showaddAgain() {
            return this.addAgain;
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        async addHEI() {
            this.$refs.Spinner.show();
            try {
                //Query Access Type
                const AccessType = Parse.Object.extend("AccessTypes");
                const queryACC = new Parse.Query(AccessType);
                queryACC.equalTo("name", "HEI");

                const accQuerResult = await queryACC.first();

                this.hei_acc_id = accQuerResult.id;

                //For Randomized Password
                var password = Math.random().toString(36).slice(-12);

                //Set HEI Address
                this.address = {
                    regionCode: this.regionCode,
                    regionName: this.regionName,
                    provinceCode: this.provinceCode,
                    province: this.province,
                    cityCode: this.cityCode,
                    city: this.city,
                    barangayCode: this.barangayCode,
                    barangay: this.barangay,
                    street: this.street,
                }

                //Create new User
                const newHEI = new Parse.User();

                //Set HEI Details
                newHEI.set("hei_name", this.hei_name);
                newHEI.set("username", this.username);
                newHEI.set("password", password);
                newHEI.set("email", this.email);
                newHEI.set("address", this.address);
                newHEI.set("number", this.number);
                newHEI.set("inst_code", this.inst_code);
                newHEI.set("hei_type", this.hei_type);
                newHEI.set("access_type", this.hei_acc_id);
                newHEI.set("receivedCredentials", false);

                //Save new HEI Account
                await newHEI.save().then(() => {
                    toast("HEI Account Added!", {
                        type: TYPE.SUCCESS,
                        timeout: 3000,
                        position: POSITION.TOP_RIGHT,
                    });
                    
                    setTimeout(
                        () =>
                        this.$router.push({
                            path: "/hei",
                        }),
                        2000
                    );
                });
            } catch (error) {
                toast("Error:" + error.code + " " + error.message, {
                    type: TYPE.ERROR,
                    timeout: 3000,
                    hideProgressBar: true,
                    position: POSITION.TOP_RIGHT,
                });
                console.log(error.message);
            }
        },
        modal() {
            var has_error = 0;
            if (
                this.hei_name == "" ||
                this.username == "" ||
                this.number == "" ||
                this.inst_code == ""
            ) {
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
    },
    mounted: async function () {
        // THIS LINES OF CODE CHECKS IF THE USER HAS A PERMISSION TO ACCESS THIS ROUTE
        const AccessTypes = Parse.Object.extend("AccessTypes");
        const query = new Parse.Query(AccessTypes);
        query.equalTo("objectId", Parse.User.current().get("access_type"));

        const querResult = await query.find();
        var accType = querResult[0].get("privileges");
        var flag = 0;
        for (var i = 0; i < accType.length; i++) {
            if (accType[i] === this.$route.path) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.$router.push("/403");
        } else {
            console.log("Hi!, You have permission to access this Page");
            //INSERT HERE MOUNTED ARGUMENTS FOR THIS COMPONENT
            //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
            regions().then((response) => {
                this.regions = response;
            });
            
            //Query HEI Types
            const HeiTypes = Parse.Object.extend("HEI_Types");
            const queryHT = new Parse.Query(HeiTypes);
            const querResultHT = await queryHT.find();

            //Store HEI Types
            var heiTypes = [];
            for (var w = 0; w < querResultHT.length; w++) {
                const heitype = querResultHT[w];
                heiTypes.push({
                    id: heitype.id,
                    title: heitype.get("name"),
                });
            }
            this.hei_types = heiTypes;
            this.hei_type = this.hei_types[0].id;
        }
    },
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

.text-error {
    color: red;
}

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}
</style>
