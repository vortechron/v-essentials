<!-- fieldAwesome.vue -->
<template>
    <div class="w-full">
        <multiselect
            v-model="type"
            placeholder="Type"
            :options='schema.types'
            label="name"
            track-by="slug"
        >
        </multiselect>

        <div v-if="type && type.has_options" class="mt-2"> 
            <multiselect
                v-model="option"
                placeholder="Option Type"
                :options="optionOptions"
                :label="type.option_label"
                :track-by="type.option_track_by"
            >
            </multiselect>
        </div>

        <div v-if="value">
            <input type="hidden" :name="`${schema.inputName}[name]`" v-model="value.name">
            <input type="hidden" :name="`${schema.inputName}[meta]`" v-model="value.meta">
        </div>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
    mixins: [abstractField],

    data() {
        return {
            type: null,
            option: null,
            optionOptions: []
        }
    },
    watch: {
        type(value) {
            if (! value) return

            this.value = {}
            this.value.name = value.slug

            axios.get(route('cms.menus.getOptions', value.slug))
                .then((response) => {
                    this.optionOptions = response.data.data
                })
        },
        option(value) {
            this.value.meta = value
        },
        value() {
            this.assignContent()
        }
    },
    methods: {
        assignContent() {
            if (this.value) {
                this.type = this.schema.types.find((type) => {
                    return type.slug == this.value.name
                })

                this.option = this.value.meta
            }
        },

    },
    mounted() {
        this.assignContent()
    }
};
</script>
