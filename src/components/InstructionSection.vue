<template>
<!-- Apply for Section -->
<div class="flex flex-col space-y-5 p-12 text-black-200 ">
    <!-- Title -->
    <div class="space-y-4">
        <div class="font-semibold text-2xl">HOW TO APPLY?</div>
        <p class="mx-32 label-text">Use these cards when you want to display content with an image, such as a blog post or product. They’re built with CSS grid to enable the 3-column layout. When you select the “Cards Grid Container,” you’ll see a red icon on the top </p>
    </div>
    <!-- Details -->
    <div class="grid grid-cols-4 gap-4 ">
        <div class="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-grey-400 p-8 text-left bg-brand-white shad " v-for="apply in applyfor" :key="apply.id">
            <div class="pb-4 label-xl">{{apply.title}}</div>
            <p class="label-text">{{apply.info.substring(0, 80) + '..'}}<span class="text-brand-darkblue hover:text-blue-100"> more.. </span> </p>
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
