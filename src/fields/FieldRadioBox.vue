<!-- fieldAwesome.vue -->
<template>
  <div :class="schema.cssClasses" class="w-full">
    <div v-for="(row, parentIndex) in renderedRow" :key="row" class="flex flex-col md:flex-row -mx-2 text-center justify-between">
      <div
        @click="value = option.value"
        v-for="(option, index) in schema.options.slice(schema.column * parentIndex, (schema.column * (parentIndex + 1)))"
        :key="index"
        :class="[value == option.value ? 'border-2 border-blue-700' : 'border  border-blue-300']" style="display: table-cell; vertical-align: middle;"
        class="my-auto transition-all duration-200 ease-in-out cursor-pointer flex-1 text-center bg-transparent hover:bg-blue-100 text-blue-500 font-semibold hover:text-gray-600 py-2 px-4 rounded px-2 py-2 m-2"
      >
        <span class="m-auto" v-html="option.label"></span>
      </div>
    </div>

    <input type="hidden" :name="schema.inputName" v-model="value">
  </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
  mixins: [abstractField],
  computed: {
      renderedRow() {
          return Math.ceil(this.schema.options.length / this.schema.column)
      }
  }
};
</script>