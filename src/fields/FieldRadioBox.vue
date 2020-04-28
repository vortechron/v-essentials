<!-- fieldAwesome.vue -->
<template>
    <div :class="schema.cssClasses">
        <div class="flex -mx-2">
            <div @click="value = option.value" v-for="(option, index) in schema.options" :key="index" :class="[value == option.value ? 'border-2 border-blue-700' : 'border  border-blue-300']" class="flex-1 text-center bg-transparent hover:bg-blue-100 text-blue-500 font-semibold hover:text-gray-600 py-2 px-4 rounded px-2 py-2 m-2">
                <span>
                    {{ option.label }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ]
   };
</script>