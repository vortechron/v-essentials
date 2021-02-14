<template>
    <transition
        leave-active-class="duration-500 sm:duration-700"
    >
    <div 
        @keydown.enter.prevent="($event) => {
            $refs.ok.click()
            $emit('ok')
        }" 
        v-show="isShow" 
        class="fixed inset-0 overflow-hidden z-10 slide-over"
    >
        <div class="absolute inset-0 overflow-hidden">
            <section class="absolute inset-y-0 pl-0 sm:pl-16 max-w-full right-0 flex">
                <transition
                    enter-class="translate-x-full"
                    enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
                    enter-to-class="translate-x-0"
                    leave-class="translate-x-0"
                    leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
                    leave-to-class="translate-x-full"
                >
                    <div v-show="isShow" class="w-screen"
                    :class="`max-w-${maxWidth}`"
                    >
                        <div
                            class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl relative"
                        >
                            <slot name="before"></slot>
                            <div class="flex-1 h-0 overflow-y-auto">

                                <header
                                    class="space-y-1 py-6 px-4 bg-indigo-700 sm:px-6"
                                >
                                    <div
                                        class="flex items-center justify-between space-x-3"
                                    >
                                        <h2
                                            class="text-lg leading-7 font-medium text-white"
                                        >
                                            {{ title }}
                                        </h2>
                                        <div class="h-7 flex items-center">
                                            <button
                                                @click.prevent="hide()"
                                                aria-label="Close panel"
                                                class="text-indigo-200 hover:text-white transition ease-in-out duration-150"
                                            >
                                                <svg
                                                    class="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div v-if="subtitle">
                                        <p
                                            class="text-sm leading-5 text-indigo-300"
                                        >
                                            {{ subtitle }}
                                        </p>
                                    </div>
                                </header>
                                <div
                                    class="flex-1 flex flex-col justify-between"
                                >
                                    <div
                                        class="px-4 divide-y divide-gray-200 sm:px-6"
                                    >
                                        <div class="space-y-6 pt-6 pb-5">
                                            <slot></slot>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end"
                            >
                                <span class="inline-flex rounded-md shadow-sm cancel">
                                    <button
                                        @click.prevent="hide()"
                                        type="button"
                                        class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                                    >
                                        {{ cancelLabel || 'Cancel' }}
                                    </button>
                                </span>
                                <span class="inline-flex rounded-md shadow-sm ok">
                                    <button
                                        ref="ok"
                                        @click.prevent="$emit('ok')"
                                        type="submit"
                                        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                    >
                                        {{ okLabel || 'Okay' }}
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </transition>
            </section>
        </div>
    </div>
    </transition>
</template>

<script>
import visi from "v-essentials/src/mixins/hasVisibility";

export default {
    mixins: [visi],
    props: {
        title: String,
        subtitle: String,
        okLabel: String,
        cancelLabel: String,
        maxWidth: {
            type: String,
            default: 'md'
        },
    },
    watch: {
        isShow(val) {
            if (! val) this.$emit('cancel')
        }
    }
};
</script>

<style></style>
