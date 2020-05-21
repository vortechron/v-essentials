<template>
  <card no-action>
    <div class="grid bg-white overflow-hidden shadow grid-cols-1 bg-gray-100" :class="`md:grid-cols-${col}`">
        <slot name="default"></slot>
    </div>
  </card>
</template>

<script>
export default {
  props: {
    col: {
      type: Number,
      default: 2
    }
  }
}
</script>

<style>

</style>