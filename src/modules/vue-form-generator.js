import Vue from 'vue'

window.VueFormGenerator = require('vue-form-generator')
Vue.use(VueFormGenerator, {
    validators: {
        requiredObject(value, field, model) {

            for (let key in value) {
                if (field.validatorSelector) {
                    if (_.isNull(value[key]) && field.validatorSelector.includes(key)) return ['This field is required!']

                    continue;
                }

                if ({}.hasOwnProperty.call(value, key) && _.isNull(value[key])) return ['This field is required!']
            }

            return []
        }
    }
});