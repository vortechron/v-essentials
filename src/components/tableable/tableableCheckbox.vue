<template>
    <span class="relative inline-flex items-center px-2 py-2 rounded bg-white">
        <input
            v-bind="$attrs"
            aria-label="Select all"
            type="checkbox"
            class="tableable form-checkbox h-4 w-4 border-gray-300 text-indigo-600 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out"
        />
    </span>
</template>

<script>
export default {
    inheritAttrs: false
};
</script>

<style></style>
