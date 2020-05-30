window.Droppable = require('droppable').default;
const _ = require('lodash');
window.enablePageChangeWarn = true;


module.exports = {
    
    turbolinksVue(vueClosure) {

        $(document).on("turbolinks:before-visit", function() {
            if (window.enablePageChangeWarn) {
                return confirm("Are you sure?");
            }
        });
        
        $(document).on("turbolinks:load", function() {
            window.enablePageChangeWarn = false
        });

        var Turbolinks = require("turbolinks");
        Turbolinks.start();
        Turbolinks.setProgressBarDelay(0);

        // enable for blood flickering sacrifice
        const TurbolinksAdapter = require('vue-turbolinks').default;
        Vue.use(TurbolinksAdapter);

        document.addEventListener('turbolinks:load', vueClosure);
    },

    install(Vue, options) {
        const pace = require('./src/pace')

        window.enablePageChangeWarn = false
        window.onload = function() {
            window.addEventListener("beforeunload", function (e) {

                if (! window.enablePageChangeWarn) {
                    return undefined;
                }
        
                var confirmationMessage = 'It looks like you have been editing something. '
                                        + 'If you leave before saving, your changes will be lost.';
        
                (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
            });
        };

        pace.start()

        require('./src/mixins')

        var Editor = require('@tinymce/tinymce-vue').default;
        Vue.component('Editor', Editor);

        if (options.hasVueDateTimePicker) {
            let VueCtkDateTimePicker = require('vue-ctk-date-time-picker');
            require('vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css');
            Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
        }

        if (options.hasVueGoogleMap) {
            let VueGoogleMaps = require("vue2-google-maps");
            Vue.use(VueGoogleMaps, {
            load: {
                key: options.vueGoogleMapKey,
                libraries: "places,geometry" // necessary for places input
            }
            });
        }

        if (options.hasBootstrapVue) {
            const { BootstrapVue, IconsPlugin } = require('bootstrap-vue');
            require('bootstrap-vue/dist/bootstrap-vue.css');
            Vue.use(BootstrapVue)
            Vue.use(IconsPlugin)
        }

        if (options.hasVueMultiselect) {
            require('vue-multiselect/dist/vue-multiselect.min.css');
            const Multiselect = require('vue-multiselect').default;
            Vue.component('multiselect', Multiselect)
        }

        if (options.hasVFG) {
            const VueFormGenerator = require('vue-form-generator');
            window.VueFormGenerator = VueFormGenerator
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
        }

        if (options.hasVueAutoRegister) {
            const files = require.context('./src', true, /\.vue$/i)
            files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
        }

        if (options.hasMoment) {
            window.moment = require('moment');
        }

        if (options.hasVMoney) {
            const money = require('v-money');
            Vue.use(money, {
                decimal: '.',
                thousands: '',
                prefix: 'RM ',
                suffix: '',
                precision: 2,
                masked: true
            })
        }

        if (options.hasAOS) {
            const AOS = require('aos');
            require('aos/dist/aos.css');
        }

        if (options.hasVueButtonSpinner) {
            const VueButtonSpinner = require('vue-button-spinner').default;
            Vue.component('ButtonSpinner', VueButtonSpinner);
        }

        if (options.hasDirectives) require('./src/directives');

        if (options.hasVueCtkDateTimePicker) {
            let VueCtkDateTimePicker = require('vue-ctk-date-time-picker');
            require('vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css');
            Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
        }
    }
}