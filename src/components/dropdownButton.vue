<template>
  <component :is="$attrs.href ? 'a' : 'button'"
        class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 w-full text-left"
  >
      <slot></slot>
  </component>
</template>

<script>
export default {
}
</script>

<style>

</style>