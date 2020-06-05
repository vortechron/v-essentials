<!-- fieldAwesome.vue -->
<template>
    <div class="w-full phone-number">
        <div class="flex -mx-1">
            <div class="w-1/4 px-1">
                <multiselect
                    v-model="code"
                    placeholder="Code"
                    label="name"
                    track-by="name"
                    :options="countries"
                    :option-height="20"
                >
                    <template slot="singleLabel" slot-scope="props">
                        <div class="flex items-center">
                            <img
                                class="h-4 pr-3 hidden sm:block"
                                :src="props.option.flag"
                            />
                            <span class="option__title">
                                +{{ props.option.calling_code }}
                            </span>
                        </div>
                    </template>
                    <template slot="option" slot-scope="props">
                        <div class="flex items-center group">
                            <img
                                class="h-4 pr-3"
                                :src="props.option.flag"
                                alt="No Man’s Sky"
                            />
                            <span class="option__title">
                                {{ props.option.name }}
                            </span>
                            <span
                                class="group-hover:text-white text-sm text-gray-400 ml-3"
                            >
                                +{{ props.option.calling_code }}
                            </span>
                        </div>
                    </template>
                </multiselect>
            </div>
            <div class="w-3/4 px-1">
                <div class="flex rounded-md">
                    <div class="relative flex-grow focus-within:z-10">
                        <input
                            v-model="number"
                            id="phone"
                            :name="`${schema.inputName}[number]`"
                            placeholder
                            class="block duration-150 ease-in-out form-input rounded-l-md rounded-none sm:leading-5 text-sm transition w-full"
                            :class="{
                                'rounded-r-md':
                                    isVerified || !value.number || !value.code
                            }"
                        />

                        <input type="hidden" :name="`${schema.inputName}[code]`" v-model="value.code">
                        <input type="hidden" :name="`${schema.inputName}[is_verified]`" v-model="isVerified">
                        <slide-x-left-transition>
                            <div
                                class="absolute flex inset-y-0 items-center pointer-events-none pr-3 right-0"
                                v-show="isVerified && schema.mustVerified"
                            >
                                <svg
                                    class="h-5 w-5 text-green-400"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    ></path>
                                </svg>
                            </div>
                        </slide-x-left-transition>
                    </div>
                    <slide-x-left-transition>
                        <button-spinner
                            v-show="! isVerified && schema.mustVerified"
                            @click.native="send"
                            :is-loading="isLoading" 
                            :disabled="isLoading"
                            class="h-100 rounded-l-none -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                        >
                           <span>Verify</span>
                        </button-spinner>
                    </slide-x-left-transition>
                </div>
            </div>
        </div>

        <modal
            ref="modal"
            @ok="verify"
            ok-label="Verify"
            title="Verify Phone Number"
            :is-ok-loading="isLoading" 
            subtitle="Please enter the verification code that we've sent to your phone number"
        >
            <template v-slot:header>
                <svg
                    class="h-6 w-6 text-green-600"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                    ></path>
                </svg>
            </template>

            <alert v-if="error" class="my-2">Wrong Verification Code</alert>

            <form class="-mt-px flex" autocomplete="off">
                <div class="w-1/2 flex-1 min-w-0">
                    <input
                        v-model="val1"
                        class="text-center form-input relative block w-full rounded-none rounded-l-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        placeholder=""
                        autocomplete="off"
                    />
                </div>
                <div class="-ml-px flex-1 min-w-0">
                    <input
                        v-model="val2"
                        class="text-center form-input relative block w-full rounded-none bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        placeholder=""
                        autocomplete="off"
                    />
                </div>
                <div class="-ml-px flex-1 min-w-0">
                    <input
                        v-model="val3"
                        class="text-center form-input relative block w-full rounded-none bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        placeholder=""
                        autocomplete="off"
                    />
                </div>
                <div class="-ml-px flex-1 min-w-0">
                    <input
                        v-model="val4"
                        class="text-center form-input relative block w-full rounded-none rounded-r-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                        placeholder=""
                        autocomplete="off"
                    />
                </div>
            </form>
        </modal>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";
import abstractFieldExtended from "v-essentials/src/mixins/abstractFieldExtended";
import { SlideXLeftTransition } from "vue2-transitions";

export default {
    mixins: [abstractField, abstractFieldExtended],
    components: {
        SlideXLeftTransition,
    },
    data() {
        return {
            code: null,
            number: null,
            isVerified: false,
            isLoading: false,
            status: false,
            error: false,
            val1: null,
            val2: null,
            val3: null,
            val4: null
        };
    },
    methods: {
        send() {
          // this.$refs.modal.show(); return
            this.isLoading = true
            axios.post(this.schema.sendUrl, this.value).then(response => {
                if (response.data.status) this.$refs.modal.show();

                this.isLoading = false
                this.status = true
            })
            .catch(() => {
              this.isLoading = false
                this.status = false
            });
        },
        verify() {
            this.isLoading = true
            // return
            let verification_code = `${this.val1}${this.val2}${this.val3}${this.val4}`;
            axios
                .post(this.schema.verifyUrl, {
                    ...this.value,
                    verification_code
                })
                .then(response => {
                    if (response.data.status) {
                        this.$refs.modal.hide();
                        this.isVerified = true;
                    } else {
                        this.error = true;
                    }

                    this.isLoading = false
                    this.status = true
                });
        },
        check() {
          if (this.value.code && this.value.number && this.schema.mustVerified) {
              axios.post(this.schema.checkUrl, this.value).then(response => {
                  this.isVerified = response.data.status;
              });
          }
        },
        debounceCheck: _.debounce(function() {
           this.check()
        }, 500)
    },
    watch: {
        code(value) {
            if (value) {
                this.value.code = value.calling_code;
                this.debounceCheck();
            } else {
                this.value.code = null;
            }

            this.triggerValidate()
        },
        number(value) {
            if (value) {
                this.value.number = value;

                this.debounceCheck();
            } else this.value.number = null;

            this.triggerValidate()

        }
    },
    computed: {
        window() {
            return window;
        },
        countries() {
            return window.countries.filter(value => {
                return value.calling_code !== null;
            });
        }
    },
    created() {

        this.schema.validatorSelector = ['code', 'number'];

        if (! this.value) {
            this.value = {
                code: '',
                number: '',
                isVerified: false
            }
        } else {
            this.code = _.find(this.countries, ["calling_code", this.value.code]);
            this.number = this.value.number;
        }


        this.check();
    }
};
</script>

<style>
.phone-number .multiselect__tags {
    min-height: 38px !important;
    padding: 8px 40px 0 8px !important;
}

.phone-number .multiselect__content-wrapper {
    min-width: 500px;
}

.phone-number .multiselect__single {
    padding-left: 5px;
    margin-bottom: 8px;
}

.phone-number .multiselect__placeholder {
    margin-bottom: 5px !important;
}
</style>
