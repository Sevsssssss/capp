<template>
<div class="font-body">
    <HeroSection />
    <InstructionSection />
    <LearnMore />
    <MapSection />
    <SendMessageForm />
    <FooterLP />
</div>
</template>

<script>
import HeroSection from "@/components//HeroSection.vue";
import InstructionSection from "@/components/InstructionSection.vue";
import LearnMore from "@/components/LearnMore.vue";
import MapSection from "@/components/MapSection.vue";
import SendMessageForm from "@/components/SendMessageForm.vue";
import FooterLP from "@/components/FooterLP.vue";

export default {
    name: "LandingView",
    components: {
        HeroSection,
        InstructionSection,
        LearnMore,
        MapSection,
        SendMessageForm,
        FooterLP,
    },
    methods: {
        login() {
            this.$router.push("/home");
        },
    },
};
</script>
