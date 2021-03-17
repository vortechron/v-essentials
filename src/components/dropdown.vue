<template>
    <transition
        name="modal"
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
        <div
            v-bind="$attrs"
            v-show="isShow"
            class="origin-top-right absolute w-48 rounded-md shadow-lg"
        >
            <div
                class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
            >
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        isShow: Boolean
    },
};
</script>

<style></style>
