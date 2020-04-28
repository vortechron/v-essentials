# The last laravel project scaffolding you will ever need

Packed with must-have components to launch enterprise ready web application.

## What you get?
1. turbolinks
2. vue components: datetimepicker, form-generator (cover all type of input), google-map, bootstrap, momentjs, v-money, animation-on-scroll
3. vue directives: v-post, v-submission

## Usage

1. Import Bootstrap css framework

```
@import '~v-scaff/scss/style.default';
```

2. Import Vue Plugin

```
import vScaff from 'v-scaff';
Vue.use(vScaff, {
    hasBootstrapVue: true,
    hasVueMultiselect: true,
    hasVFG: true,
    hasVueAutoRegister: true,
    hasMoment: true,
    hasVMoney: true,
    hasAOS: true,
    hasVueButtonSpinner: true,
    hasDirectives: true,
    hasVueGoogleMap: true,
    vueGoogleMapKey: 'your-key',
    hasVueCtkDateTimePicker: true,
});
```

3. Available directives

#### v-post="your-route" : post request made easy
```
<a v-post="'{{ route('logout') }}'">Logout</a>
```

#### v-submission="['vfg-ref']" : trigger validate method on vfg form and add loading state on button for 1s
```
<button v-submission="['profileForm', 'avatarForm']" type="submit">Submit</button>
```