<template>
    <td class="pr-6">
        <div class="relative flex justify-end items-center">
            <button
                v-click-outside="
                () => {
                    showDropdown = false;
                }
                "
                @click="showDropdown = !showDropdown"
                id="project-options-menu-0"
                aria-has-popup="true"
                type="button"
                class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                <span class="sr-only">Open options</span>
                <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                    />
                </svg>
            </button>

            <transition
            enter-active-class="transition ease-out duration-100"
            enter-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
            >
                <div
                    v-show="showDropdown"
                    class="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="project-options-menu-0"
                >
                    <div class="py-1" role="none">
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </div>
    </td>
</template>

<script>
export default {
    data() {
        return {
            showDropdown: false
        }
    }
};
</script>

<style></style>
