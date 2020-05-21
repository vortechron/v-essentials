<script>
export default {
  props: {
    populateData: Object,
    populateMethods: Object,
    atMounted: {
      type: Function,
      default: () => {}
    },
  },
  data() {
    return {
      data: this.populateData
    };
  },
  mounted() {
    _.each(this.populateMethods || {}, (method, key) => {
      this[key] = method
    })

    this.atMounted()
  }
};
</script>

<style>
</style>