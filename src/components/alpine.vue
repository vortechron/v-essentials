<script>
export default {
  props: {
    populateData: Object,
  },
  data() {
    return {
      data: this.populateData
    };
  },
  computed: {
    console: () => console,
    window: () => window
  }
};
</script>

<style>
</style>