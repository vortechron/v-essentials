<!-- fieldAwesome.vue -->
<template>
    <div class="flex items-center">
        <span class="h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-5" v-if="selected">
            <img class="h-full w-full text-gray-300" :src="selected.full_url" alt="" srcset="">
        </span>
        <media-manager @select="selected = $event"></media-manager>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
    mixins: [abstractField],
    data() {
        return {
            selected: null
        }
    }
};
</script>
