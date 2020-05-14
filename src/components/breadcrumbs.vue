<template>
    <nav class="font-sans w-full text-sm">
        <ol class="list-reset flex text-grey-dark">
            <template v-for="(item, index) in items">
                <li>
                    <a :href="item.url || null" class="font-semibold"
                        :class="[item.url ? 'text-indigo-700' : 'text-gray-500']"
                    >{{
                        item.label
                    }}</a>
                </li>
                <li v-if="index + 1 != items.length">
                    <span class="mx-2">/</span>
                </li>
            </template>
        </ol>
    </nav>
</template>

<script>
export default {
    props: {
        items: Array
    }
};
</script>

<style></style>
