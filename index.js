window.Droppable = require('droppable').default;

module.exports = {
    turbolinksVue(vueClosure) {
        var Turbolinks = require("turbolinks");
        Turbolinks.start();
        Turbolinks.setProgressBarDelay(0);

        const TurbolinksAdapter = require('vue-turbolinks');
        Vue.use(TurbolinksAdapter);

        document.addEventListener('turbolinks:load', vueClosure);
    },

    install(Vue, options) {
        window._ = require('lodash');

        Vue.mixin({
            computed: {
              _() {
                return _;
              }
            }
          });

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
            require('vue-form-generator/dist/vfg.css');
            window.VueFormGenerator = VueFormGenerator
            Vue.use(VueFormGenerator)
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
            const VueButtonSpinner = require('vue-button-spinner');
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