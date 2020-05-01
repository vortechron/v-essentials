<!-- fieldAwesome.vue -->
<template>
    <div class="border mb-3 mt-4 w-full">
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