<template>
  <div :class="schema.cssClasses">
    <div class="flex flex-col mb-4" v-if="media && media.length > 0">
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
        >
          <table class="min-w-full">
            <slide-y-down-transition group tag="tbody" :duration="600">
              <tr v-for="(m, index) in media" :key="m.id" class=" bg-white">
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
                      <input type="hidden" :name="`${schema.inputName}[${index}][id]`" v-model="m.id" />
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
                    class="focus:text-red-800 h-8 hover:text-red-500 transition w-8 float-right"
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
    <media-upload 
    :id="fieldId" 
    :is-show="schema.multiple || ((! schema.multiple) && media && media.length == 0)" 
    :has-error="errors.length > 0"
    :accept="schema.accept"
    :placeholder="schema.placeholder"
    :multiple="schema.multiple"
    @change="fileChanged"
    @dropped="dropped"></media-upload>
  </div>
</template>

<script>
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
    },
    dropped(files) {
      this.uploadMedia(files);
    }
  },
  mounted() {
    this.key = Math.floor(Math.random() * 100) + "-" + Date.now();

    this.media = this.value ? this.value : []
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