<!-- fieldAwesome.vue -->
<template>
    <div :class="schema.cssClasses">
        <heading :title="schema.title" :subtitle="schema.subtitle"></heading>
    </div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ],
         mounted() {
             console.log('testset');
         }
   };
</script>