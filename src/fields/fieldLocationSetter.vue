<!-- fieldAwesome.vue -->
<template>
    <div :class="schema.cssClasses ? schema.cssClasses: {'w-full': true}">
        <location-setter @change="changed"></location-setter>
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