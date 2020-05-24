<template>
  <div
      v-if="isShow"
      :id="id"
      :class="[hasError ? 'border-red-300' : 'border-gray-300']"
      class="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md"
    >
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="mt-1 text-sm text-gray-600">
          <button
            @click="$refs[`${id}-input`].click()"
            type="button"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
          >Upload a file</button>
          or drag and drop
          <input
            :ref="`${id}-input`"
            type="file"
            class="hidden"
            :accept="accept"
            :name="name"
            :multiple="!_.isNull(multiple) ? multiple : true"
            @change="fileChanged"
          />
        </p>
        <p
          class="mt-1 text-xs text-gray-500"
        >{{ placeholder ? placeholder : 'PNG, JPG, GIF up to 10MB'}}</p>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        accept: String,
        placeholder: String,
        name: String,
        isShow: {
            type: Boolean,
            default: true
        },
        hasError: {
            type: Boolean,
            default: false
        },
        multiple: Boolean
    },
    methods: {
        fileChanged(event) {
            this.$emit('change', event);
        }
    },
    mounted() {

        const droppable = new Droppable({
            element: document.querySelector("#" + this.id),
            isClickable: false
        });

        droppable.onFilesDropped(files => {
            this.$emit('dropped', files)
        });
    }
}
</script>

<style>

</style>