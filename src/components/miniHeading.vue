<template>
    <div :class="{'flex items-center': isInline}">
        <div class="flex items-center" :class="[isCenter ? 'justify-center' : '']">
            <icon-pack :name="icon" v-if="icon" class="mr-1"></icon-pack>
            <span class="font-semibold text-sm">{{ title }}</span>
        </div>

        <div class="text-xs" :class="{'ml-2':isInline}">
            {{ subtitle }}
        </div>
    </div>
</template>

<script>
import iconPack from './iconPack'

export default {
    components: {iconPack},
    props: {
        icon: String,
        title: String,
        subtitle: String,
        isCenter: Boolean,
        isInline: Boolean
    }
};
</script>

<style></style>
