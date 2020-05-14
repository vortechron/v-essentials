<template>
    <div>
        <div class="flex items-center" :class="[isCenter ? 'justify-center' : '']">
            <icon-pack :name="icon"></icon-pack>
            <span class="ml-1 font-semibold text-sm">{{ title }}</span>
        </div>

        <div class="text-xs mt-1">
            {{ subtitle }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        title: String,
        subtitle: String,
        isCenter: Boolean
    }
};
</script>

<style></style>
