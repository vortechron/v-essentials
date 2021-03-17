<template>
    <div class="align-middle inline-block w-full border-b border-gray-200 overflow-auto">
        <table class="min-w-full">
            <thead>
                <tr class="border-t border-gray-200">
                    <slot name="head"
                    :motherCheckboxAttrs="{
                        value: motherCheckbox,
                        indeterminate: motherCheckboxIndeterminate,
                    }" 
                    :motherCheckboxEvents="{
                        change: toggleAllCheckboxes,
                        input: (value) => { this.motherCheckbox = value }
                    }" 
                    ></slot>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
                <slot name="body" 
                :checkboxes="checkboxes"
                :items="items"
                ></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        items: Array
    },
    data() {
        return {
            motherCheckbox: false,
            motherCheckboxIndeterminate: false,
            checkboxes: [],
        }
    },
    methods: {
        toggleAllCheckboxes(state) {
            if (this.motherCheckboxIndeterminate) return
            this.checkboxes.forEach((element,index) => {
                this.$set(this.checkboxes, index, state)
            })
        }
    },
    watch: {
        motherCheckbox(value) {
            if (value) this.motherCheckboxIndeterminate = false
        },
        checkboxes() {
            let truthy, falsy = null
            this.checkboxes.forEach((element,index) => {
                if (element) truthy = true
                if (!element) falsy = true
            })

            // all true
            if (truthy && falsy === null) this.motherCheckbox = true
            
            // all false
            if (falsy && !truthy) {
                this.motherCheckboxIndeterminate = false
                this.motherCheckbox = false
            }
            
            // true at least one
            if (truthy && falsy) {
                this.motherCheckboxIndeterminate = true
                this.motherCheckbox = false
            }
        }
    },
    created() {
        this.items ? this.items.forEach((value, index) => {
            this.$set(this.checkboxes, index, false)
        }) : null
    }
};
</script>

<style></style>
