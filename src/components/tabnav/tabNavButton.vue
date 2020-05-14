<template>
    <a :href="(!isActive) ? url : null" class="border-gray-200" :class="[isActive ? 'bg-white border-b-4 border-indigo-700' : '' ]">
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