<!-- fieldAwesome.vue -->
<template>
    <div>
        <div class="font-semibold text-lg">{{ schema.title }}</div>
    </div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ]
   };
</script>