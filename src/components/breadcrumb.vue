<template>
    <a
        :href="url || null"
        class="font-semibold"
        :class="[url ? 'text-indigo-700' : 'text-gray-500']"
        >{{ label }}</a
    >
</template>

<script>
export default {
    props: ['url', 'label']
};
</script>

<style></style>
