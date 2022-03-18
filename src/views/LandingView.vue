<template>
<div>

    <HeroSection />
    <InstructionSection />
    <LearnMore />
    <MapSection />
    <SendMessageForm />
</div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import InstructionSection from "@/components/InstructionSection.vue";
import LearnMore from "@/components/LearnMore.vue";
import MapSection from "@/components/MapSection.vue";
import SendMessageForm from "@/components/SendMessageForm.vue";

export default {
    name: "LandingView",
    components: {
    HeroSection,
    InstructionSection,
    LearnMore,
    MapSection,
    SendMessageForm
},
    methods: {
        login() {
            this.$router.push("/home");
        },
    },
};
</script>
