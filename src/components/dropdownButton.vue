<template>
  <component 
    @click="$emit('click')" 
    :is="component" 
    :href="href"
    class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 w-full text-left"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    component: {
      type: String,
      default: 'button'
    },
    href: String
  }
}
</script>

<style>

</style>