<!-- fieldAwesome.vue -->
<template>
    <div class="ctk-date-time-picker" :class="schema.cssClasses ? schema.cssClasses : { 'w-full': true }">
        <vue-ctk-date-time-picker
            :only-date="schema.onlyDate ? schema.onlyDate : false"
            v-model="value"
            :format="format"
            :formatted="formatted"
        />
        <input type="hidden" :name="schema.inputName" v-model="value" />
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
    mixins: [abstractField],
    methods: {
        changed(data) {
            this.value = data;
        }
    },
    computed: {
        format() {
            if (this.schema.onlyDate) {
                return "YYYY-MM-DD"
            }

            return "YYYY-MM-DD HH:mm:ss"
        },
        formatted() {
            if (this.schema.onlyDate) {
                return "ll"
            }

            return "llll"
        }
    }
};
</script>

<style>
.field-clear-button {
    margin: auto 0 !important;
}
</style>
