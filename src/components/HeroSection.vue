<template>
  <div>
    <section class="h-screen hero bg-cover bg-fixed bg-center">
          <button @click="login()" >Login</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
  components: {
  },
  methods: {
    login() {
      this.$router.push("/home");
    },
  },
};
</script>

<style>
.slidein {
  padding: 2em 3em;
  position: fixed;
  z-index: 100;
  right: -100%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
}
.open {
  right: 0;
}
.open-login {
  padding-left: 5rem;
}

.close-btn {
  font-size: 2em;
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5em;
}
</style>
