<template>
    <div>
        <notification ref="noti" @close="$refs.noti.hide()"></notification>

        <div class="flex items-center">
            <span class="rounded-md shadow-sm">
                <button
                    @click="$refs.modal.show()"
                    type="button"
                    class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                >
                    Select Media
                </button>
            </span>
        </div>

        <modal
            max-width="3xl"
            ref="modal"
            has-cancel
            ok-label="Select"
            cancel-label="Close"
            style="z-index: 1040;"
            :is-ok-loading="selectedIndex == -1"
            @ok="$emit('select', media[selectedIndex]); $refs.modal.hide()"
        >
            <tabs ref="tabs">
                <tab-blank title="Uploaded Image" class="flex">

                    <card 
                    class="h-60 overflow-y-auto overflow-x-hidden w-full"
                    >
                        <pulse-loader :loading="isLoading" color="#5850ec" class="py-1/6"></pulse-loader>
                        <div class="flex items-center flex-wrap">
                            <div
                                :id="`media${index}`"
                                @click="toggleSelectMedia(index)"
                                :class="[
                                    selectedIndex == index ? 'bg-blue-200' : '',
                                ]"
                                class="w-1/2 sm:w-1/3 p-4 h-full cursor-pointer duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-lg transform transition-all" v-for="(m, index) in media" :key="m.id">
                                <img
                                    :src="m.full_url"
                                    alt="media-manager-image"
                                />
                            </div>
                        </div>
                    </card>

                </tab-blank>
                <tab-blank title="Upload Media">
                    <card class="p-2">

                        <div v-if="uploadPercentage > 0" class="h-2 bg-green-600 rounded-t-full" :style="`width: ${uploadPercentage}%; transition: width 1s, height 4s;`"></div>

                        <media-upload
                        :is-show="tempReRender"
                        :id="'media-manager-upload'"
                        :multiple="true"
                        @change="uploadMedia($event.target.files)"
                        @dropped="uploadMedia"></media-upload>
                    </card>
                </tab-blank>
                <tab-blank title="Import from Instagram">
                    <card class="p-2">
                        <a :href="instagramAuthUrl" class="inline-flex rounded-md shadow-sm">
                            <button type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                                {{ igMedia.length > 0 ? 'Re-import' : 'Link with Instagram' }} 
                            </button>
                        </a>
                    </card>
                </tab-blank>
            </tabs>
        </modal>
    </div>
</template>

<script>
var PulseLoader = require('vue-spinner/src/PulseLoader.vue').default;

export default {
    components: {
        PulseLoader
    },
    props: {
        instagramAuthUrl: {
            type: String,
            default: '/instagram/authorize'
        }
    },
    data() {
        return {
            selectedIndex: -1, 
            media: [],
            igMedia: [],
            uploadPercentage: 0,
            tempReRender: true,
            isLoading: false,
        }
    },
    methods: {
        uploadMedia(files) {
            var formData = new FormData();

            _.forEach(files, (file, index) => {
                formData.append(`media[]`, file);
            });

            const axiosConfig = {
                onUploadProgress: ( progressEvent ) => {
                    this.uploadPercentage = parseInt(Math.round((progressEvent.loaded/progressEvent.total)*100));
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            axios
                .post("/media-upload-manager", formData, axiosConfig)
                .then(response => {
                    this.fetch()
                    this.uploadPercentage = 0
                    this.$refs.tabs.selectTab(0)
                    this.rerenderForm()
                })
                .catch(() => {
                    this.$refs.noti.show()
                    this.uploadPercentage = 0
                    this.rerenderForm()
                });
        },
        fetch() {
            this.isLoading = true
            this.media = []
            this.igMedia = []
            axios
            .get("/media-upload-manager")
            .then(response => {
                this.isLoading = false
                this.media = response.data.media
                this.igMedia = response.data.igMedia
            });
        },
        rerenderForm() {
            this.tempReRender = false
            this.$nextTick(() => {
                this.tempReRender = true
            })
        },
        toggleSelectMedia(index) {
            if (this.selectedIndex == index) {
                this.selectedIndex = -1
            } else {
                this.selectedIndex = index

                // setTimeout(() => {
                //     document.getElementById(`media${index}`).scrollIntoView();
                // }, 500)
            }
        }
    },
    mounted() {
        this.fetch()

        this.$refs.noti.setup('Opps!', 'Something went wrong, check your file format', 'exclamation', 'text-red-700')
    }
};
</script>

<style>

</style>
