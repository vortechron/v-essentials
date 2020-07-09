const money = require('v-money');
Vue.use(money, {
    decimal: '.',
    thousands: '',
    prefix: 'RM ',
    suffix: '',
    precision: 2,
    masked: true
})