<template>
  <div>
    <div
      class="
        w-full
        bg-brand-darkblue
        flex
        shadow-sm
        text-brand-white
        px-3
        lg:px-10
        py-3
        justify-between
        items-center
        fixed
        z-10
      "
    >
      <div
        class="
          text-xl
          uppercase
          font-bold
          flex
          items-center
          gap-3
          lg:order-first lg:mx-0
        "
      >
        <img src="../assets/img/CHED_logo.png" class="h-8" alt="CHED Logo" />
        CHEDRO V
      </div>
      <div
        class="
          flex
          items-center
          lg:order-last lg:right-0 lg:absolute lg:pr-10
        "
      >
        <button><BellOutline class="h-6 " /></button>
      </div>
    </div>
  </div>
</template>
<script>
import BellOutline from 'vue-material-design-icons/BellOutline.vue';

export default {
 
  name: "TopNavigation",
  components: {
    BellOutline,
  },
};
</script>

