<template>
  <div>
    <div>This is LandingView</div>
    <button @click="login()" >Login</button>
    
  </div>
</template>

<script>

export default {
  name: "LandingView",
  components: {
    
  },
  methods: {
    login() {
      this.$router.push("/home");
    },
  },
};
</script>