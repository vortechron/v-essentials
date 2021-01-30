<template>
    <span class="relative z-0 inline-flex shadow-sm rounded">
        <button
            v-click-outside="
                () => {
                    showSort = false;
                }
            "
            @click="showSort = !showSort"
            type="button"
            class="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:ring-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
            <svg
                class="-ml-1 mr-2 h-5 w-5 text-gray-400 hidden sm:block"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
                />
            </svg>
            Sort
        </button>

        <input type="hidden" name="sort" v-model="sortChecked"/>

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
                v-show="showSort"
                class="origin-top-right absolute right-0 mt-1/2 w-56 rounded-md shadow-lg z-10"
            >
                <div class="rounded-md bg-white ring-1 ring-black ring-opacity-5">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </span>
</template>

<script>
export default {
    props: {
        sort: Array
    },
    data() {
        return {
            showSort: false,
            sortChecked: null
        };
    }
};
</script>

<style></style>
