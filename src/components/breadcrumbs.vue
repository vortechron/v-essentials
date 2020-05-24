<template>
    <nav class="font-sans w-full text-sm">
        <ol class="list-reset flex text-grey-dark">
            <template v-for="(item, index) in items">
                <li>
                    <vnodes :node="item"></vnodes>
                </li>
                <li v-if="index + 1 != items.length">
                    <span class="mx-2">/</span>
                </li>
            </template>
        </ol>

        <div style="visibility: hidden; display: none;">
            <slot></slot>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.$slots.default.forEach((item) => {
            if (item.context) this.items.push(item)
        })
    }
};
</script>

<style></style>
