<!-- fieldAwesome.vue -->
<template>
    <div class="w-full">
        <editor v-model="value" :init="{plugins: 'wordcount', width: '100%', height: schema.height || 200}" class="rounded-sm"/>
        <input type="hidden" :name="schema.inputName" v-model="value">
    </div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ]
   };
</script>

<style>
    .tox-notification--warning {display: none !important;}

    .vue-form-generator .field-wrap .tox-editor-container button  {
        display: flex;
        padding: 0px 4px;
        margin: 2px 4px 3px 0px;
        font-size: 14px;
        line-height: 34px;
        border: 0px solid #ccc;
    }

    .tox .tox-statusbar__text-container {
        height: 18px;
    }

    button.tox-statusbar__wordcount {
        line-height: 1px !important;
    }

    .tox.tox-tinymce {
        border-radius: 0.125rem;
    }
</style>