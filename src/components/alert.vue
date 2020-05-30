<template>
    <div :class="`border-${color}-400 bg-${color}-50 border-l-4 p-4`">
        <div class="flex">
            <div class="flex-shrink-0" v-if="icon">
                <icon-pack :class="`h-5 w-5 text-${color}-400`" :name="icon"></icon-pack>
            </div>
            <div class="ml-3">
                <p class="text-sm leading-5 text-yellow-700">
                    <slot></slot>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'red'
        },
        icon: {
            type: String,
        }
    }
};
</script>

<style></style>
