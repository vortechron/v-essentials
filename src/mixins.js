Vue.mixin({
    computed: {
      _() {
        return _;
      },
      $logs() {
        return console.log
      },
      $window() {
        return window
      },
      $bus() {
        return require('./event-bus').default
      }
    },
    methods: {
        getMeta(metaName) {
            const metas = document.getElementsByTagName('meta');
          
            for (let i = 0; i < metas.length; i++) {
              if (metas[i].getAttribute('name') === metaName) {
                return metas[i].getAttribute('content');
              }
            }
          
            return '';
        },
        hasSlot(name = "default") {
            return !!this.$slots[name] || !!this.$scopedSlots[name];
        },
        warnBeforeSubmit(ref, label) {
            window.enablePageChangeWarn = false

            if (confirm("Are you sure?")) {
                if (ref && ref.nodeType) ref.submit()
                else this.$refs[ref].submit();
            } else { 
                window.enablePageChangeWarn = true;
            }
        },
        vueMultiselectValues(collections, pluck = 'id') {
            return this.model[collections].map((item) => item[pluck])
        },
        vueMultiselectCustomLabel(collections, key = 'name', pluck = 'id') {
            return (opt) => {
                return this.model[collections].find(function (item) { return item[pluck] == opt; })[key];
            }
        },
    }
  });