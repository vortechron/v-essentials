import Vue from 'vue'

require('vue-multiselect/dist/vue-multiselect.min.css');
const { Multiselect } = require('vue-multiselect')
Vue.component('multiselect', Multiselect)