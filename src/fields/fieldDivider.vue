<!-- fieldAwesome.vue -->
<template>
    <div class="border w-full" :class="schema.length || 'mb-3 mt-4'">
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