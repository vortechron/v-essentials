<!-- fieldAwesome.vue -->
<template>
  <div :class="schema.cssClasses">
    <div v-for="(row, parentIndex) in renderedRow" :key="row" class="flex -mx-2 text-center">
      <div
        @click="itemClicked(option)"
        v-for="(option, index) in schema.options.slice(schema.column * parentIndex, (schema.column * (parentIndex + 1)))"
        :key="index"
        :class="[isClicked(option) ? 'border-2 border-blue-700' : 'border  border-blue-300']"
        class="flex-1 text-center bg-transparent hover:bg-blue-100 text-blue-500 font-semibold hover:text-gray-600 py-2 px-4 rounded px-2 py-2 m-2"
      >
        <span class="m-auto">{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
  mixins: [abstractField],
  methods: {
    itemClicked(option) {
        let isFound = false
        let foundIndex;
        for (let index = 0; index < this.value.length; index++) {
        if (option.value === this.value[index].value) {
            isFound = true;
            foundIndex = index
        }
      }

        if (! isFound)
            this.value.push(option);
        else
            this.value.splice(foundIndex, 1)
    },
    isClicked(option) {
      for (let index = 0; index < this.value.length; index++) {
        if (option.value === this.value[index].value) return true;
      }

      return false;
    }
  },
  computed: {
      renderedRow() {
          return Math.ceil(this.schema.options.length / this.schema.column)
      }
  }
};
</script>