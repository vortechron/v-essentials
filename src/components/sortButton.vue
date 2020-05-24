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
            class="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
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

        <input type="hidden" name="sort" v-model="sortChecked" />

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
                <div class="rounded-md bg-white shadow-xs">
                    <div v-for="s in sort" :key="s.name">
                        <div>
                            <div class="py-1">
                                <a
                                    @click="submitSort(s.name)"
                                    href="#"
                                    class="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                    :class="[
                                        getParameterByName('sort') == s.name
                                            ? 'bg-gray-100 text-gray-900'
                                            : ''
                                    ]"
                                    >{{ s.label }} {{ s.asc }}</a
                                >
                                <a
                                    @click="submitSort('-' + s.name)"
                                    href="#"
                                    class="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                    :class="[
                                        getParameterByName('sort') ==
                                        '-' + s.name
                                            ? 'bg-gray-100 text-gray-900'
                                            : ''
                                    ]"
                                    >{{ s.label }} {{ s.desc }}</a
                                >
                            </div>
                            <div class="border-t border-gray-100"></div>
                        </div>
                    </div>
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
    },
    methods: {
        getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return "";
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        submitSort(value) {
            this.sortChecked = value;

            this.$nextTick(() => {
                this.$emit('change', value)
            });
        }
    },
    mounted() {
        this.sortChecked = this.getParameterByName("sort");
    }
};
</script>

<style></style>
