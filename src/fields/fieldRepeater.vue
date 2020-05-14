<template>
  <div class="w-full">
        <div v-for="(rep, index) in value" :key="index">
            <div class="px-6 py-5 border-2 border-dashed rounded-md border-gray-300 mb-3">
                <vue-form-generator tag="div" :schema="fields(index)" :model="rep" :options="formOptions"></vue-form-generator>

                <button @click.prevent="value.splice(index, 1)" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150">
                    Delete
                </button>
            </div>
        </div>

        <button @click.prevent="value.push({})" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
            {{ schema.addLabel || 'Add' }}
        </button>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";
import abstractFieldExtended from "v-essentials/src/mixins/abstractFieldExtended";

export default {
    mixins: [abstractField, abstractFieldExtended],
    watch: {
        value() {
            this.triggerValidate()
        }
    },
    methods: {
        fields(index) {
            let fields = this.schema.fields.map((schema) => {
                let s = JSON.parse(JSON.stringify(schema)) 
                let inputName = s.inputName
                s.inputName = `${this.schema.inputName}[${index}][${inputName}]`
                return s
            })

            return {
                "groups": [
                    {
                        "styleClasses": "form-row",
                        fields
                    }
                ]
            }
        }
    }
}
</script>

<style>

</style>