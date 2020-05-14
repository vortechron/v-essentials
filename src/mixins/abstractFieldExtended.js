import { get as objGet, forEach, isFunction, isString, isArray, debounce, uniqueId, uniq as arrayUniq } from "lodash";

export default {
    methods: {
        triggerValidate() {
            if (isFunction(this.schema.onChanged)) {
                this.schema.onChanged.call(this, this.model, newValue, oldValue, this.schema);
            }
    
            if (objGet(this.formOptions, "validateAfterChanged", false) === true) {
                if (objGet(this.schema, "validateDebounceTime", objGet(this.formOptions, "validateDebounceTime", 0)) > 0) {
                    this.debouncedValidate();
                } else {
                    this.validate();
                }
            }
        }
    }
}