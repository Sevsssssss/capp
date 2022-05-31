<template>
<!-- Apply for Section -->
<div class="flex flex-col space-y-5 p-12 ">
    <!-- Title -->
    <div class="space-y-4">
        <div class="font-bold xl:text-2xl md:text-xl sm:text-xl xs:text-xl">HOW TO APPLY?</div>
        <p class="xl:mx-32 md:mx-20 label-text ">
            Et has minim elitr intellegat. Mea aeterno eleifend antiopam ad, nam
            no suscipit quaerendum. At nam minimum ponderum. Est audiam animal
            molestiae te. Ex duo eripuit mentitum. Et has minim elitr
            intellegat. Mea aeterno eleifend antiopam ad, nam no suscipit
            quaerendum. At nam minimum ponderum. Est audiam animal molestiae te.
            Ex duo eripuit mentitum </p>
    </div>
    <!-- Details -->
    <div class="grid xxxl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 self-center sm:grid-cols-2 xs:grid-cols-1 gap-8">
        <div class="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-grey-400 p-8 text-left bg-brand-white shad " v-for="apply in applyfor" :key="apply.id">
            <div class="flex pb-4 xl:label-xl md:text-base sm:text-base xs:text-base"><span class="font-semibold pr-2" style="font-size: 30px; color: #bdccf0">{{apply.step}}</span>{{apply.title}}</div>
            <p class="label-text">{{apply.desc}}</p>
        </div>
    </div>
</div>
</template>

<style>

</style>

<script>
export default {
    name: "InstructionSection",
    data() {
        return {
            showdate: true,
            // The arrays info can be use in next template
            applyfor: [{
                    id: 1,
                    step: "01",
                    title: "Select your Application",
                    desc: "There are 4 Applications to choose from.",
                },
                {
                    id: 2,
                    step: "02",
                    title: "Upload Documents",
                    desc: "Make sure that all the documents are correct.",
                },
                {
                    id: 3,
                    step: "03",
                    title: "Submit Application",
                    desc: "Wait for any updates regarding your Application",
                },
                {
                    id: 4,
                    step: "04",
                    title: "Prepare for Evaluation",
                    desc: "Evaluation will be held onsite",
                },
                {
                    id: 6,
                    step: "05",
                    title: "Wait for Certification",
                    desc: "Wait for the Certificate to be sent.",
                },
            ]
        }
    },
    components: {},
};
</script>
