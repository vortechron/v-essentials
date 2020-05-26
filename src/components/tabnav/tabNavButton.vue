<template>
    <a :href="(!isActive) ? url : null" class="border-gray-200 cursor-pointer" :class="[isActive ? 'border-b-4 border-indigo-700 bg-white' : 'bg-gray-100' ]">
        <div class="px-4 py-5 sm:pt-4 sm:pb-2">
            <mini-heading :icon="icon" :title="title" is-center :class="[isActive ? 'text-indigo-700' : '' ]"></mini-heading>
        </div>
    </a>
</template>

<script>
export default {
    props: {
        isActive: Boolean,
        title: String,
        icon: String,
        url: String
    }
}
</script>

<style scoped>

</style>