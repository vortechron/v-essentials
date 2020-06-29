<template>
    <div :class="schema.styleClasses" class="w-full">
        <prism-editor :code="code" language="blade" emit-events @change="value=$event"></prism-editor>
        <input type="hidden" :name="schema.inputName" v-model="value">
    </div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ],
         data() {
             return {
                 code: ""
             }
         },
         mounted() {
             this.code = this.value = this.value || this.schema.default
         }
   };
</script>
