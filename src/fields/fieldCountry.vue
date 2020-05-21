<!-- fieldAwesome.vue -->
<template>
    <div class="w-full">
        <multiselect
            v-model="country"
            placeholder="Country"
            label="name"
            track-by="name"
            :options="countries"
        >
            <template slot="singleLabel" slot-scope="props">
                <div class="flex items-center">
                    <img
                        class="h-4 pr-3 hidden sm:block"
                        :src="props.option.flag"
                    />
                    <span class="option__title">
                        {{ props.option.name }}
                    </span>
                </div>
            </template>
            <template slot="option" slot-scope="props">
                <div class="flex items-center group">
                    <img
                        class="h-4 pr-3"
                        :src="props.option.flag"
                    />
                    <span class="option__title">
                        {{ props.option.name }}
                    </span>
                </div>
            </template>
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
            country: null
        }
    },

    watch: {
        country(value) {
            this.value = value ? value.code : null
        }
    },

    computed: {
        countries() {
            if (
                typeof this.value === "string" ||
                this.value instanceof String
            ) {
                let res = _.find(window.countries, ["code", this.value]);
                this.country = res;
            }

            return window.countries;
        }
    },
    mounted() {
        this.schema.onChanged = () => {
            if (this.model.address) {
                this.model.address.state = null
            } else {
                this.model.state = null
            }
        }
    }
};
</script>
