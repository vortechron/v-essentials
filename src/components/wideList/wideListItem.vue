<template>
    <li>
        <a
            :href="url"
            class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
        >
            <div class="flex items-center px-4 py-4 sm:px-6">
                <div class="min-w-0 flex-1 flex items-center">
                    <div
                        class="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4 items-center"
                    >
                        <slot></slot>
                    </div>
                </div>
                <div>
                    <svg
                        class="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </div>
            </div>
        </a>
    </li>
</template>

<script>
export default {
    props: ['url']
};
</script>

<style></style>
