<template>
<!-- Apply for Section -->
<div class="flex flex-col justify-center space-y-5 p-16 text-black-300 ">
    <!-- Title -->
    <div class="space-y-5 ">
        <div class="font-semibold lead-paragraph">How to Apply?</div>
        <p class="justify-center ml-32 mr-32 label-text">Use these cards when you want to display content with an image, such as a blog post or product. They’re built with CSS grid to enable the 3-column layout. When you select the “Cards Grid Container,” you’ll see a red icon on the top </p>
    </div>
    <!-- Details -->
    <div class="grid grid-cols-4 gap-4 ">
        <div class="max-w-sm rounded overflow-hidden shadow-lg p-8 text-left bg-brand-white  " v-for="apply in applyfor" :key="apply.id">
            <div class="pb-4 label-xl">{{apply.title}}</div>
            <p class="label-text ove">{{apply.info.substring(0, 80) + '..'}}<span class="text-brand-darkblue hover:text-brand-lightblue"> more.. </span> </p>
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
                    title: 'Select Application Type',
                    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
                },
                {
                    id: 2,
                    title: 'Upload Documents',
                    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
                },
                {
                    id: 3,
                    title: 'Submit Application',
                    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
                },
                {
                    id: 4,
                    title: 'Wait for Certification',
                    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. '
                },
            ]
        }
    },
    components: {},
};
</script>
