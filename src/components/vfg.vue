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
            options: Object
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
            {
                "fields": [
                    ${this.$slots.default[0].text}
                ]
            }
            `;
            eval("this.schema =" + x);

            this.$slots = []
        }
    }
</script>
