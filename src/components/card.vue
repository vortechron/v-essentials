<template>
    <div class="shadow-md rounded-sm">
        <div class="bg-white px-4 py-3 border-b border-gray-200 sm:px-6" v-if="title || hasSlot('title')">
            <div
                class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
            >
                <div class="ml-4 mt-4">
                    <h3 class="text-normal leading-6 font-medium text-gray-900 flex">
                        <slot name="title">{{ title }}</slot>
                    </h3>
                    <p
                        class="mt-1 text-sm leading-5 text-gray-500"
                        v-if="subtitle"
                    >
                        {{ subtitle }}
                    </p>
                </div>
                <div class="ml-4 mt-4 flex-shrink-0">
                    <slot name="action">
                        <btn
                            v-if="actionLabel"
                            :size="actionSize || 'sm'"
                            :color="actionColor"
                            @click="$emit('action')"
                            :href="actionUrl"
                        >
                            {{ actionLabel }}
                        </btn>
                    </slot>
                </div>
            </div>
        </div>
        <slot name="before-content"></slot>
        <div class="bg-white px-4 py-3 border-b border-gray-200 sm:px-6" v-if="hasSlot('content')">
            <slot name="content"></slot>
        </div>
        <slot></slot>
        <div class="px-4 py-5 sm:p-6 bg-gray-100" v-if="hasSlot('content-grayed')">
            <slot name="content-grayed"></slot>
        </div>
        <slot name="after-content"></slot>
    </div>
</template>

<script>
import btn from './btn';

export default {
    components: {btn},
    props: {
        title: String,
        subtitle: String,
        actionLabel: String,
        actionUrl: String,
        actionColor: {
            type: String,
            default: 'indigo'
        },
        noAction: Boolean
    }
};
</script>

<style>

</style>
