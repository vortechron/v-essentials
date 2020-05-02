<!-- fieldAwesome.vue -->
<template>
  <div :class="schema.cssClasses">
    <div class="flex flex-col">
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  v-for="(field, index) in schema.fields"
                  :key="index"
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >{{ field.label }}</th>
                <th class="pr-6 w-1 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, indexParent) in schema.items" :key="indexParent">
                <td
                  v-for="(field, index) in schema.fields"
                  :key="index"
                  class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                >
                  <div class="max-w-xs rounded-md shadow-sm">
                    <input
                      :id="field.key"
                      class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      v-model="item[field.key]"
                    />
                  </div>
                </td>
                <td
                  @click="removeRow(indexParent)"
                  class="cursor-pointer pr-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5 text-red-700">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="mt-2 text-blue-600 text-sm transition duration-500 ease-in-out hover:text-blue-800 hover:font-semibold cursor-pointer"
          @click="addRow"
        >+ Add More</div>
      </div>
    </div>
  </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
  mixins: [abstractField],
  methods: {
    addRow() {
      this.schema.items.push({});
    },
    removeRow(index) {
      this.schema.items.splice(index, 1);
    }
  }
};
</script>
