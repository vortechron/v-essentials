<!-- fieldAwesome.vue -->
<template>
    <div class="flex items-center">
        <span class="h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-5" v-if="value">
            <img class="h-full w-full text-gray-300" :src="value.full_url" alt="" srcset="">
        </span>
        <media-manager @select="value = $event"></media-manager>

        <input type="hidden" :name="schema.inputName" :value="value ? value.id : null">
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
    mixins: [abstractField],
};
</script>
