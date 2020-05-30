<!-- fieldAwesome.vue -->
<template>
    <div class="form-check">
      <label class="form-check-label">
        <input type="checkbox" class="form-check-input" v-model="value">
        {{ schema.inputLabel }}
      </label>

      <input type="hidden" :name="schema.inputName" :value="value ? 1 : 0">
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";

export default {
    mixins: [abstractField]
};
</script>
