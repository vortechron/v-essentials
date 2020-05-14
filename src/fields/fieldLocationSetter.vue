<!-- fieldAwesome.vue -->
<template>
    <div :class="schema.cssClasses ? schema.cssClasses: {'w-full': true}">
        <location-setter :lat="_.toNumber(value.lat)" :lng="_.toNumber(value.lng)" @change="changed"></location-setter>
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
         }
   };
</script>