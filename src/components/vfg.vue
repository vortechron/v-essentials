<template>
    <div>
        <div style="visibility: hidden; display: none;">
            <slot>
            </slot>
        </div>
        <vue-form-generator tag="div" :schema="schema" :model="model" :options="options"></vue-form-generator>
    </div>
</template>

<script>
    export default {
        props: {
            model: Object,
            options: Object,
            isRow: Boolean
        },
        data() {
            return {
                schema: {}
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
                ${this.isRow ? '"styleClasses": "form-row",' : ''}
                "fields": [
                    ${this.$slots.default[0].text}
                ]
            }
            ${this.isRow ? ']}' : ''}
            `;
            eval("this.schema =" + x);

            this.$slots = []
        }
    }
</script>
