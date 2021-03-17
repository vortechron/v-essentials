<template>
    <div class="flex items-center">
        <v-checkbox v-bind="$attrs" v-on="$listeners"></v-checkbox>
        <button 
            v-click-outside="() => checkboxActionClicked = false" 
            @click="checkboxActionClicked = !checkboxActionClicked" 
            v-show="$attrs.value || $attrs.indeterminate" 
            class="w-5 h-5 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <v-hero-icon name="chevron-down"></v-hero-icon>
            <v-dropdown class="ml-40 mt-20" :is-show="checkboxActionClicked">
                <slot></slot>
            </v-dropdown>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkboxActionClicked: false,
        }
    }
}
</script>

<style>

</style>