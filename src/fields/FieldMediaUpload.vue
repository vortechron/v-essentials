<template>
  <div :class="schema.cssClasses">
    <div class="flex flex-col mb-4" v-if="media && media.length > 0">
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="min-w-full">
            <slide-y-down-transition group tag="tbody" :duration="600">
              <tr v-for="(m, index) in media" :key="m.id">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        v-if="isImage(m.mime_type)"
                        class="h-10 w-10 rounded"
                        :src="m.full_url"
                        alt
                      />
                      <svg v-else fill="currentColor" viewBox="0 0 20 20" class="h-10">
                        <path
                          fill-rule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <input type="hidden" :name="`${schema.inputName}[media][${index}]`" v-model="m.id" />
                      <div
                        class="text-sm leading-5 font-medium text-gray-900"
                      >{{ m.file_name }}</div>
                      <div class="text-sm leading-5 text-gray-500">{{ m.mime_type }}</div>
                    </div>
                  </div>
                </td>

                <td
                  @click="removeMedia(index)"
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    class="focus:text-red-800 h-8 hover:text-red-500 transition w-8"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </td>
              </tr>
            </slide-y-down-transition>
          </table>
        </div>
      </div>
    </div>
    <div
      v-show="schema.multiple || ((! schema.multiple) && media && media.length == 0)"
      :id="fieldId"
      :class="[errors.length > 0 ? 'border-red-300' : 'border-gray-300']"
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
            @click="$refs[fieldInputId].click()"
            type="button"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
          >Upload a file</button>
          or drag and drop
          <input
            :ref="fieldId + '-input'"
            type="file"
            class="hidden"
            :accept="schema.accept"
            :multiple="!_.isNull(schema.multiple) ? schema.multiple : true"
            @change="fileChanged"
          />

          <input type="hidden" :name="`${schema.inputName}[key]`" v-model="key" />
        </p>
        <p
          class="mt-1 text-xs text-gray-500"
        >{{ schema.placeholder ? schema.placeholder : 'PNG, JPG, GIF up to 10MB'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// need to npm install droppable

// cssClasses: 'w-full',
// inputName: 'fonts[]',
// multiple: true,
// accept: null ,
// placeholder: 'Font File Only',
// model: "files",

import { forEach } from "lodash";
import { abstractField } from "vue-form-generator";
import { SlideYDownTransition } from "vue2-transitions";

export default {
  components: {
    SlideYDownTransition
  },
  mixins: [abstractField],
  data() {
    return {
      key: null,
      media: []
    };
  },
  computed: {
    fieldId() {
      return this.getFieldID(this.schema);
    },
    fieldInputId() {
      return this.fieldId + "-input";
    }
  },
  methods: {
    removeMedia(index) {
      this.media.splice(index, 1);

      this.value = this.media
    },

    isImage(mimeType) {
      const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

      return acceptedImageTypes.includes(mimeType);
    },

    uploadMedia(files) {
      var formData = new FormData();

      formData.append(`key`, this.key);
      forEach(files, (file, index) => {
        formData.append(`media[]`, file);
      });

      const axiosConfig = {
        onUploadProgress: progressEvent => console.log(progressEvent.loaded),
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios
        .post(this.schema.uploadUrl || "/media-upload", formData, axiosConfig)
        .then(response => {
          this.media.push(...response.data.media)
          this.value = this.media
        });
    },

    fileChanged(event) {
      this.uploadMedia(event.target.files);
    }
  },
  mounted() {
    this.key = Math.floor(Math.random() * 100) + "-" + Date.now();

    this.media = this.value

    const droppable = new Droppable({
      element: document.querySelector("#" + this.fieldId),
      isClickable: false
    });

    droppable.onFilesDropped(files => {
      this.uploadMedia(files);
    });
  }
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>