<!-- fieldAwesome.vue -->
<template>
    <div :class="schema.cssClasses ? schema.cssClasses: {'w-full': true}">
        <vue-ctk-date-time-picker v-model="value"/>
        <input type="hidden" :name="schema.inputName" v-model="value">
    </div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ],
         methods: {
             changed(data) {
                 this.value = data
             }
         },
         mounted() {
             console.log('testset');
         }
   };
</script>