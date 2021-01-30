<template>
    <div>
        <div style="visibility: hidden; display: none;">
            <slot></slot>
        </div>
        <vue-form-generator tag="div" :schema="schemaData" :model="model" :options="options"></vue-form-generator>
    </div>
</template>

<script>
    export default {
        props: {
            schema: Object,
            model: Object,
            options: {
                type: Object,
                default() {
                    return { validateAfterChanged: true }
                }
            },
            isRow: Boolean,
            styleClasses: String
        },
        data() {
            return {
                schemaData: this.schema
            }
        },
        methods: {
            vfg() {
                return this.$children[0]
            },
            validate() {
                this.vfg().validate();
            }
        },
        mounted() {
            var x = `
            ${this.isRow ? '{ "groups": [' : ''}
            {
                ${this.isRow ? `"styleClasses": "form-row ${this.styleClasses}",` : ''}
                "fields": [
                    ${this.$slots.default[0].text}
                ]
            }
            ${this.isRow ? ']}' : ''}
            `;
            eval("this.schemaData =" + x);

            this.$slots = []
        }
    }
</script>
