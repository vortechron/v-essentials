# The last laravel project scaffolding you will ever need

This package heavily depends on tailwindcss ^1.0.0

#### Installation

Run:
``` npm install v-essentials --save ``` 

most requirement has been listed in package.json and auto import.

except few things that need to manual install on your project:

Then:

##### 1. [tailwindcss](https://www.5balloons.info/getting-started-with-tailwindcss-on-laravel/)
- tailwind.config.js
```
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  important: "#app",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')
  ],
}
```

##### 2. [vortechron/laravel-essentials](https://github.com/vortechron/laravel-essentials)

- generate countries to use vfg countries, state, phone number field 
```
php artisan essentials:generate-countries
```

## Usage

#### 1. Import Bootstrap css framework (optional)

```
@import '~v-scaff/scss/style.default';
```
or you can import individually on your scss file

#### 2. Import Vue Plugin

```
import vEss from 'v-essentials';
Vue.use(vEss, {
    hasBootstrapVue: true,
    hasVueMultiselect: true, // - req by vfg
    hasVFG: true, // - req by vfg
    hasVueAutoRegister: true, // - req by vfg
    hasMoment: true, // - req by vfg
    hasVMoney: true, // - req by vfg
    hasAOS: true, 
    hasVueButtonSpinner: true, // - req by directives
    hasDirectives: true, 
    hasVueGoogleMap: true, // - req by vfg
    vueGoogleMapKey: 'your-key', // - req by vfg
    hasVueCtkDateTimePicker: true, // - req by vfg [ctkdatetimepicker]
});
```

#### 3. Available directives

v-post="your-route" : post request made easy
```
<a v-post="'{{ route('logout') }}'">Logout</a>
```

v-submission="['vfg-ref']" : trigger validate method on vfg form and add loading state on button for 1s
```
<button v-submission.spinner="['profileForm', 'avatarForm']" type="submit">Submit</button>
```

#### 4. Available Components

- alpine: inline reusable vuejs component
```
<alpine inline-template :populate-data="{ open: false }">

    <button @click="data.open = !data.open">Click Me</button>

    <div v-if="data.open">
        Hello world 
    </div>

</alpine>
```

- heading
```
<heading title="hello" subtitle="world"></heading>
```

- locationSetter
```
<location-setter
    placeholder=""
    :show-map="true"
    :enable-fields="true"
    :lat="3.21312"
    :lng="3.21312"
    :boot="true" // set marker
    input-class=""
    @change=""
></location-setter>
```

- modal
```
<button @click="$refs.modal.show()">Open Modal</button> 
<modal ref="modal" :has-cancel ok-label title="this is title" subtitle="this is subtitle" @ok="">
    Hello world
</modal>
```

- progressBar
```
<progress-bar :percent="20%"></progress-bar>
```

- tabs
```
<tabs>
    <tab title="Hello">
        <template v-slot:icon>
            some icon here
        </template>

        tab content
    </tab>
</tabs>
```

-vfg: vue-form-generator wrapper to improve productivity
```
<vfg :options="formOptions" :model="model">
    {
        type: "divider"
    }
</vfg>
```

#### 5. Available VFG Fields 

- checkBoxExt
```
{
    type: "checkBoxExt",
    cssClasses: "",
    column: 3,
    label: "Waht am i ?",
    model: "",
    options: [
        {
            label: "Cute",
            value: ""
        }
    ]
}
```

- ctkDateTimePicker
```
{
    type: "ctkDateTimePicker",
    cssClasses: "w-full",
    inputName: "dob",
    label: "Date of Birth"
    model: ""
}
```

- divider
```
{
    type: "divider",
}
```

- heading
```
{
    type: "heading",
    cssClasses: "my-2",
    title: "",
    subtitle: ""
}
```

- locationSetter
```
{
    type: "locationSetter",
    cssClasses: "w-full"
}
```

- mediaUpload
```
{
    type: "mediaUpload",
    cssClasses: 'w-full',
    inputName: 'fonts[]',
    multiple: true,
    accept: null ,
    placeholder: 'Font File Only',
    model: "files"
}
```

- services
```
{
    type: "checkBoxExt",
    cssClasses: "",
    label: "Your services",
    model: "",
    options: [
        {
            label: "Delivery",
            description: "Delivery me up",
            value: "20",
            is_active: false
        },
        {
            label: "Pickup",
            description: "Pick me up",
            value: "5",
            is_active: true
        }
    ]
}
```

- tableInput
```
{
    type: "tableInput",
    model: "",
    cssClasses: "w-full",
    label: "Treatment charges?",
    fields: [
        {"key": "treatment", "label": "Treatment", },
        {"key": "charge", "label": "Charge (RM)", }
    ],
    items: [
        {"treatment": "Consultation Fee", "charge": 32,},
        {"treatment": "To fill", "charge": 10,},
    ]
}
```

- title
```
{
    type: "title",
    title: "Hi tq all"
}
```

- phoneNumber
```
{
    type: "phoneNumber",
    inputType: "text",
    inputName: "phone_number",
    label: "Contact Number",
    model: "phone_number",
    checkUrl: "{{ route('verify.check') }}",
    sendUrl: "{{ route('verify.send') }}",
    verifyUrl: "{{ route('verify.code') }}",
    required: true,
    validator: ['required']
}
```
