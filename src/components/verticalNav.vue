<template>
    <a
        :href="href"
        :class="[
            ...styleClasses.common,
            isActive
                ? styleClasses.onlyActive.join(' ')
                : styleClasses.onlyNormal.join(' ')
        ]"
        aria-current="page"
    >

        <icon-pack
            v-if="icon"
            outline
                    :class="[
            ...iconClasses.common,
            isActive
                ? iconClasses.onlyActive.join(' ')
                : iconClasses.onlyNormal.join(' ')
        ]"
            :name="icon"
        ></icon-pack>
        <span class="truncate">
            <slot></slot>
        </span>
    </a>
</template>

<script>
export default {
    props: {
        href: String,
        icon: String,
        isActive: Boolean
    },
    data() {
        return {
            iconModules: null,
            styleClasses: {
                common: [
                    "mt-1",
                    "first:mt-0",
                    "group",
                    "flex",
                    "items-center",
                    "px-3",
                    "py-2",
                    "text-sm",
                    "leading-5",
                    "font-medium",
                    "rounded-md",
                    "hover:text-gray-900",
                    "focus:outline-none",
                    "no-underline",
                    "transition",
                    "ease-in-out",
                    "duration-150"
                ],
                onlyActive: [
                    "text-gray-900",
                    "bg-gray-100",
                    "hover:bg-gray-100",
                    "focus:bg-gray-200"
                ],
                onlyNormal: [
                    "mt-1",
                    "text-gray-600",
                    "hover:bg-gray-50",
                    "focus:bg-gray-100"
                ]
            },
            iconClasses: {
                common: [
                    "flex-shrink-0",
                    "-ml-1",
                    "mr-3",
                    "h-6",
                    "w-6",
                    "group-hover:text-gray-500",
                    "transition",
                    "ease-in-out",
                    "duration-150"
                ],
                onlyActive: ["text-gray-500", "group-focus:text-gray-600"],
                onlyNormal: ["text-gray-400", "group-focus:text-gray-500"]
            }
        };
    }
};
</script>

<style></style>
