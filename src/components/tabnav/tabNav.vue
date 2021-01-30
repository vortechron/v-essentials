<template>
  <card no-action>
    <div class="grid bg-white overflow-hidden shadow bg-gray-100" :class="`grid-cols-${col}`">
        <slot name="default"></slot>
    </div>
  </card>
</template>

<script>
import card from './../card'

export default {
  components: {card},
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