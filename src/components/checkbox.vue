<template>
    <span class="relative inline-flex items-center px-2 py-2 rounded">
        <input
            v-bind="$attrs"
            v-model="model"
            aria-label="Select all"
            type="checkbox"
            :indeterminate.prop="indeterminate"
            class="tableable form-checkbox h-4 w-4 border-gray-300 text-indigo-600 focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out"
        />
    </span>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        value: Boolean,
        indeterminate: Boolean
    },
    data() {
        return {
            model: this.value
        }
    },
    watch: {
        model() {
            this.$emit('input', this.model)
            this.$emit('change', this.model)
        },
        value(value) {
            this.model = value
        }
    }
};
</script>

<style></style>
