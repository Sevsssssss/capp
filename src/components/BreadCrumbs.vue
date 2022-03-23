<template>
  <div
    class="
      breadcrumbs
      mt-14
      w-full
      p-2
      fixed
      shadow-sm
      text-left
      bg-brand-white
    "
  >
    <div class="text-sm breadcrumbs">
      <ul>
        <!-- <li v-for="(crumb, ci) in crumbs" :key="ci">
          <a
            class="link"
            :class="{ disabled: isLast(ci) }"
            @click="selected(crumb)"
          >
            {{ crumb }}
          </a>
        </li> -->

        <li v-for="menu in menu" :key="menu.href">
          <a class="link">
            {{ menu.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    menu: [],
  },
  watch:{
      $route(){
        this.getRoute();
        console.log(this.$route)
      }
  },
  methods: {
    getRoute() {
    //   this.menu = this.$route.matched;
      console.log(this.$route)
    },
    isLast(index) {
      return index === this.crumbs.length - 1;
    },
    selected(crumb) {
      this.$emit("selected", crumb);
    },
  },
  created () {
      this.getRoute();
  }
};
</script>



