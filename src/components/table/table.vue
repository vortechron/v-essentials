<template>
    <div class="align-middle inline-block min-w-full border-b border-gray-200">
        <table class="min-w-full">
            <thead>
                <tr class="border-t border-gray-200">
                    <slot name="head"></slot>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
                <slot name="body"></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {};
</script>

<style></style>
