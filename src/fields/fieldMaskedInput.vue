<template>
    <money v-model="maskedValue" v-bind="conf" :class="['form-control']"></money>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
    mixins: [abstractField],
    data() {
        return {
            maskedValue: 0,
            conf: {
                decimal: this.schema.decimal || ".",
                thousands: this.schema.thousands || ",",
                prefix: this.schema.prefix,
                suffix: this.schema.suffix,
                precision: this.schema.precision != null ? this.schema.precision : 2,
                masked: false
            }
        };
    },
    watch: {
        maskedValue(value) {
            this.value = value
        }
    },
    mounted() {
        this.maskedValue = !this.value ? 0 : this.value
    }
};
</script>
