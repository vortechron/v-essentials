<template>
  <div>
    <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ title }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
        {{ subtitle }}        
      </p>
  </div>
</template>

<script>
export default {
    props: ['title', 'subtitle']
};
</script>

<style>
</style>