<template>
     <div style="height: 8px;" class="progress rounded-0 sticky-top">
      <div role="progressbar" :style="{width: percent}" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" class="progress-bar"></div>
    </div>
</template>

<script>
export default {
    props: ['percent']
}
</script>

<style>

</style>