<template>
    <div class="bg-white overflow-hidden shadow-md rounded-sm">
        <div class="bg-white px-4 py-3 border-b border-gray-200 sm:px-6">
            <div
                class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap"
            >
                <div class="ml-4 mt-4">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                        {{ title }}
                    </h3>
                    <p
                        class="mt-1 text-sm leading-5 text-gray-500"
                        v-if="subtitle"
                    >
                        {{ subtitle }}
                    </p>
                </div>
                <div class="ml-4 mt-4 flex-shrink-0">
                    <span class="inline-flex rounded-md shadow-sm">
                        <a
                            :href="href"
                            class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
                        >
                            Create new job
                        </a>
                    </span>
                </div>
            </div>
        </div>
        <div class="bg-white px-4 py-3 border-b border-gray-200 sm:px-6">
            <slot name="middle"></slot>
        </div>
            <slot></slot>
        <!-- <div class="px-4 py-5 sm:p-6">
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        subtitle: String,
        href: String
    }
};
</script>

<style></style>
