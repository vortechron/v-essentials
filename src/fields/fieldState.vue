<!-- fieldAwesome.vue -->
<template>
    <div class="w-full">
        <multiselect
            v-model="state"
            placeholder="State"
            :options="states"
        >
        </multiselect>

        <input type="hidden" :name="schema.inputName" v-model="value">
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
    mixins: [abstractField],

    data() {
        return {
            state: null
        }
    },

    watch: {
        state(value) {
            this.value = value
        }
    },

    methods: {

    },

    computed: {
        states() {
            let address = this.model.address ? this.model.address.country : null
            
            let res = _.find(window.countries, ["code", address || this.model.country]);
            
            this.state = this.value

            return res ? res.states : [];
        }
    },
    mounted() {
    }
};
</script>
