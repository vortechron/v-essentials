<template>
    <div class="flex-1 flex">
        <div class="w-full flex md:ml-0">
            <label for="search_field" class="sr-only">Search</label>
            <div
                class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
                <div
                    class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                >
                    <svg
                        class="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        ></path>
                    </svg>
                </div>
                <input
                    id="search_field"
                    class="border-0 block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm focus:ring-0"
                    placeholder="Search"
                    type="search"
                    name="q"
                    v-model="q"
                    @keydown.enter="atEnter"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['endpoint', 'value'],
    data() {
        return {
            q: this.value
        }
    },
    methods: {
        atEnter() {
            this.$emit('search', this.q)
        }
    }
};
</script>

<style></style>
