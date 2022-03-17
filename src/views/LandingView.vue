<template>
  <div>
    
     <HeroSection/>
     <InstructionSection/>
  </div>
</template>

<script>
import HeroSection from "@/components/HeroSection.vue";
import InstructionSection from "@/components/InstructionSection.vue";
export default {
  name: "LandingView",
  components: {
    HeroSection,
    InstructionSection
  },
  methods: {
    login() {
      this.$router.push("/home");
    },
  },
};
</script>