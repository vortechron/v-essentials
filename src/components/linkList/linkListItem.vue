<template>
    <ul class="font-semibold text-sm text-indigo-700">
        <a :href="url">{{ label }}</a>
    </ul>
</template>

<script>
export default {
    props: ['label', 'url']
};
</script>

<style></style>
