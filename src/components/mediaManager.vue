<template>
    <div>
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
        >
            <tabs>
                <tab-blank title="Uploaded Image">
                    <card>
                        <div class="flex items-center flex-wrap">
                            <div class="w-1/2 sm:w-1/3 md:w-1/5 p-4 h-full">
                                <img
                                    src="https://moundspet.com/wp-content/uploads/2017/03/Placeholder-1.png"
                                    alt=""
                                />
                            </div>
                            <div class="w-1/2 sm:w-1/3 md:w-1/5 p-4 h-full">
                                <img
                                    src="https://moundspet.com/wp-content/uploads/2017/03/Placeholder-1.png"
                                    alt=""
                                />
                            </div>

                            <div class="w-1/2 sm:w-1/3 md:w-1/5 p-4 h-full">
                                <img
                                    src="https://via.placeholder.com/640x360"
                                    alt=""
                                />
                            </div>

                            <div class="w-1/2 sm:w-1/3 md:w-1/5 p-4 h-full">
                                <img
                                    src="https://moundspet.com/wp-content/uploads/2017/03/Placeholder-1.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </card>
                </tab-blank>
                <tab-blank title="Upload Media">
                    <card class="p-2">

                        <div v-if="uploadPercentage > 0" class="h-2 bg-green-600 rounded-t-full" :style="`width: ${uploadPercentage}%; transition: width 1s, height 4s;`"></div>

                        <media-upload 
                        :id="'media-manager-upload'" 
                        @change="uploadMedia($event.target.files)"
                        @dropped="uploadMedia"></media-upload>
                    </card>
                </tab-blank>
                <slot></slot>
            </tabs>
        </modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            uploadPercentage: 0
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
                    console.log(this.uploadPercentage);
                },
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            };

            axios
                .post("/media-upload-manager", formData, axiosConfig)
                .then(response => {
                    this.uploadPercentage = 0
                // this.media.push(...response.data.media)
                // this.value = this.media
                });
        },
    }
};
</script>

<style>

</style>
