<template>
    <component :is="component" :href="(!isActive) ? href : '#'" class="border-gray-200 cursor-pointer" :class="[isActive ? 'border-b-4 border-indigo-700 bg-white' : 'bg-gray-100' ]">
        <div class="px-4 pt-4 pb-2">
            <mini-heading :icon="icon" :title="title" is-center :class="[isActive ? 'text-indigo-700' : '' ]"></mini-heading>
        </div>
    </component>
</template>

<script>
import miniHeading from './../miniHeading'

export default {
    components: {miniHeading},
    props: {
        component: {
            type: String,
            default: 'a'
        },
        isActive: Boolean,
        title: String,
        icon: String,
        href: String
    }
}
</script>

<style scoped>

</style>