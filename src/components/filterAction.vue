<template>
    <div>
        <span
            class="relative z-0 inline-flex shadow-sm rounded"
            @click="$refs.modalFilter.show()"
        >
            <button
                type="button"
                class="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
                <svg
                    class="-ml-1 mr-2 h-5 w-5 text-gray-400 hidden sm:block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                    />
                </svg>
                Filter
            </button>
        </span>
        <modal ref="modalFilter" ok-label="Filter" @ok="$emit('change')">
            <slot></slot>
        </modal>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
