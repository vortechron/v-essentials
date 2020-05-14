<template>
    <div>
        <input type="hidden" name="_token" v-model="token">

        <input v-if="modelData && modelData.state == 'edit'" type="hidden" name="_method" value="PUT">
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    data() {
        return {
            token: null,
            modelData: null
        }
    },

    mounted() {
        this.token = this.getMeta('csrf-token')

        this.modelData = this.data ? this.data : this.$window._data
    }

}
</script>

<style>

</style>