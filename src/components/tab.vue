<template>
    <card v-show="isActive" :title="title">
        <template v-slot:content>
            <slot></slot>
        </template>
    </card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Tab"
        }
    },
    data() {
        return {
            isActive: true
        };
    }
};
</script>

<style>
</style>