<template>
    <form ref="form" class="flex justify-end sm:justify-between flex-wrap">
        <div class="inline-flex mb-2 sm:mb-0">
            <div class="relative inline-flex shadow-sm mr-2 rounded" v-if="hasBulk">
                <span
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white"
                >
                    <input
                        ref="motherCheckbox"
                        aria-label="Select all"
                        type="checkbox"
                        class="form-checkbox h-4 w-4 border-gray-300 text-indigo-600 focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out"
                    />
                </span>
                <button
                    v-click-outside="
                        () => {
                            showBulk = false;
                        }
                    "
                    @click="showBulk = !showBulk"
                    type="button"
                    class="relative inline-flex items-center px-4 py-2 -ml-px rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:ring-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >
                    <svg
                        class="-ml-1 mr-2 h-5 w-5 text-gray-400 hidden sm:block"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                    </svg>
                    Bulk Actions
                </button>

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
                        v-show="showBulk"
                        class="absolute ml-1/5 mt-1/4 origin-top-left shadow-lg w-56 z-10 rounded"
                    >
                        <div class="rounded-md bg-white ring-1 ring-black ring-opacity-5">
                            <div class="py-1">
                                <slot name="bulk" v-bind:comp="this"></slot>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <filter-action v-if="hasSlot('filter')" @change="$emit('filter')">
                <slot name="filter"></slot>
            </filter-action>
        </div>

        <div class="ml-2" v-if="hasSlot('sort')">
            <sort-action class="float-right">
                <slot name="sort"></slot>
            </sort-action>
        </div>
    </form>
</template>

<script>
import filterAction from './../filterAction'
import sortAction from './../sortAction/sortAction'

export default {
    components: {sortAction, filterAction},
    props: {
        hasBulk: Boolean
    },
    data() {
        return {
            showBulk: false
        };
    },
    methods: {
        submit() {
            this.$refs.form.submit()
        }
    },
    mounted() {
        this.$bus.$on('submit-form', () => {
            this.$refs['form'].submit()
        })
    }
};
</script>

<style></style>
