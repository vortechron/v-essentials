<template>
  <div class="w-full">
        <div v-for="(rep, index) in value" :key="index">
            <div class="px-6 py-5 border-2 border-dashed rounded-md border-gray-300 mb-3">
                <vue-form-generator :ref="`vfg_${index}`" tag="div" :schema="fields(index)" :model="rep" :options="formOptions"></vue-form-generator>

                <button v-if="!schema.disabled" @click.prevent="value.splice(index, 1)" type="button" class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:ring-red active:bg-red-200 transition ease-in-out duration-150">
                    Delete
                </button>
            </div>
        </div>

        <button :id="schema.addId || 'repeater-add-button'" v-if="(typeof schema.showAddButton === 'undefined' ? true : schema.showAddButton) && !schema.disabled" @click.prevent="value.push({})" class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
            {{ schema.addLabel || 'Add' }}
        </button>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";
import abstractFieldExtended from "v-essentials/src/mixins/abstractFieldExtended";
import { get as objGet, forEach, isFunction, isString, isArray, debounce, uniqueId, uniq as arrayUniq } from "lodash";
import validators from "vue-form-generator/src/utils/validators";
import { slugifyFormID } from "vue-form-generator/src/utils/schema";

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
                let s = Object.assign({}, schema);
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
        },
        validate(calledParent) {
			this.clearValidationErrors();
			let validateAsync = objGet(this.formOptions, "validateAsync", false);

			let results = [];

			if (this.schema.validator && this.schema.readonly !== true && this.disabled !== true) {
				let validators = [];
				if (!isArray(this.schema.validator)) {
					validators.push(convertValidator(this.schema.validator).bind(this));
				} else {
					forEach(this.schema.validator, validator => {
						validators.push(convertValidator(validator).bind(this));
					});
				}

				forEach(validators, validator => {
					if (validateAsync) {
						results.push(validator(this.value, this.schema, this.model));
					} else {
						let result = validator(this.value, this.schema, this.model);
						if (result && isFunction(result.then)) {
							result.then(err => {
								if (err) {
									this.errors = this.errors.concat(err);
								}
								let isValid = this.errors.length === 0;
								this.$emit("validated", isValid, this.errors, this);
							});
						} else if (result) {
							results = results.concat(result);
						}
					}
				});
			}

			let handleErrors = (errors) => {
				let fieldErrors = [];
				forEach(arrayUniq(errors), err => {
					if (isArray(err) && err.length > 0) {
						fieldErrors = fieldErrors.concat(err);
					} else if (isString(err)) {
						fieldErrors.push(err);
					}
				});
				if (isFunction(this.schema.onValidated)) {
					this.schema.onValidated.call(this, this.model, fieldErrors, this.schema);
				}

				let isValid = fieldErrors.length === 0;
				if (!calledParent) {
					this.$emit("validated", isValid, fieldErrors, this);
				}
				this.errors = fieldErrors;
				return fieldErrors;
            };
            
            forEach(this.$refs, (ref) => {
                ref[0].validate()
            })

			if (!validateAsync) {
				return handleErrors(results);
			}

			return Promise.all(results).then(handleErrors);
		},
    }
}
</script>

<style>

</style>