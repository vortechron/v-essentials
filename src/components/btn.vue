<template>
    <span @click="$emit('click')" :class="`inline-flex rounded-md shadow-sm ${theme}`">
        <component :is="component"
            v-bind="$attrs"
            :class="[ sizes[size], generatedTheme, isDisabled ? 'disabled:opacity-50' : '',  btnClass ]"
            class="inline-flex items-center border text-xs font-medium focus:outline-none transition ease-in-out duration-150 focus:ring-1 focus:z-10"
            :disabled="isDisabled"
        >
            <slot></slot>
        </component>
    </span>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        component: {
            type: String,
            default: 'button'
        },
        size: {
            type: String,
            default: 'xs'
        },
        theme: {
            type: String,
            default: 'primary'
        },
        color: {
            type: String,
            default: 'indigo'
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        btnClass: {
            type: String,
            default: 'rounded'
        }
    },
    data() {
        return {
            sizes: {
                xs: ["px-2.5", "py-1.5", "text-xs", "leading-4"],
                sm: ["px-3", "py-2", "text-sm", "leading-4"],
                md: ["px-4", "py-2", "text-sm", "leading-5"],
                lg: ["px-4", "py-2", "text-base", "leading-6"]
            },
            themes: {
                primary: [
                    "border-transparent",
                    "text-white",
                    "bg-{{color}}-600",
                    "hover:bg-{{color}}-500",
                    "focus:border-{{color}}-700",
                    "focus:ring-{{color}}-500",
                    "active:bg-{{color}}-700"
                ],
                secondary: [
                    "border-transparent",
                    "text-{{color}}-700",
                    "bg-{{color}}-100",
                    "hover:bg-{{color}}-50",
                    "focus:border-{{color}}-300",
                    "focus:ring-{{color}}-50",
                    "active:bg-{{color}}-200"
                ],
                white: [
                    "border-gray-300",
                    "text-gray-700",
                    "bg-white",
                    "hover:text-gray-500",
                    "focus:border-blue-300",
                    "focus:ring-blue",
                    "active:text-gray-800",
                    "active:bg-gray-50"
                ]
            }
        }
    },
    computed: {
        generatedTheme() {
            let raw = this.themes[this.theme]

            if (this.theme == 'white') return raw

            return raw.map((c) => c.replace('{{color}}', this.color))
        }
    }
};
</script>

<style></style>
