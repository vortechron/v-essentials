<template>
    <li class="list-none">
        <ul class="font-semibold text-sm text-indigo-700" v-for="l in link" :key="l.url">
            <a :href="l.url">{{ l.label }}</a>
        </ul>
    </li>
</template>

<script>
export default {
    props: {
        link: Array
    }
};
</script>

<style></style>
