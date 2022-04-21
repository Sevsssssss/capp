<template>
<div class=" pl-3 breadcrumbs mt-14 w-full fixed shadow-sm">
    <div class="text-sm breadcrumbs">
        <ul>
            <li v-for="(crumb, ci) in crumbs" :key="ci">
                <a class="link no-underline hover:text-blue-400 " :class="{ disabled: isLast(ci) }" @click="selected(crumb)">
                    {{ crumb.title }}
                </a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props: {
        crumbs: {
            type: [],
            required: true
        },
    },
    watch: {
        $route() {
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
    created() {
        this.getRoute();
    }
};
</script>
