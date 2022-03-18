<template>
  <div>
    
     <HeroSection/>
     <InstructionSection/>
     <LearnMore/>
  </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import InstructionSection from "@/components/InstructionSection.vue";
import LearnMore from "@/components/LearnMore.vue";
export default {
  name: "LandingView",
  components: {
    HeroSection,
    InstructionSection,
    LearnMore
},
  methods: {
    login() {
      this.$router.push("/home");
    },
  },
};
</script>