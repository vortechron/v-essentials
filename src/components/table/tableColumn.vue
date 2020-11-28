<template>
    <th
        :class="{'hidden md:table-cell' : hideMobile}"
        class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
        <slot></slot>
    </th>
</template>

<script>
export default {
    props: {
        hideMobile: Boolean
    }
};
</script>

<style></style>
