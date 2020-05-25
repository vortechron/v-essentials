Vue.mixin({
    components: {
        Vnodes: {
            functional: true,
            render: (h, ctx) => ctx.props.node
        }
    },
    data() {
        return {
            tempShow: false
        };
    },
    computed: {
        _() {
            return _;
        },
        $logs() {
            return console.log;
        },
        $window() {
            return window;
        },
        $bus() {
            return require("./event-bus").default;
        }
    },
    methods: {
        getMeta(metaName) {
            const metas = document.getElementsByTagName("meta");

            for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute("name") === metaName) {
                    return metas[i].getAttribute("content");
                }
            }

            return "";
        },
        hasSlot(name = "default") {
            return !!this.$slots[name] || !!this.$scopedSlots[name];
        },
        warnBeforeSubmit(ref, label) {
            window.enablePageChangeWarn = false;

            if (confirm("Are you sure?")) {
                if (ref && ref.nodeType) ref.submit();
                else this.$refs[ref].submit();
            } else {
                window.enablePageChangeWarn = true;
            }
        },
        vueMultiselectValues(collections, pluck = "id") {
            return this.model[collections].map(item => item[pluck]);
        },
        vueMultiselectCustomLabel(collections, key = "name", pluck = "id") {
            return opt => {
                return this.model[collections].find(function(item) {
                    return item[pluck] == opt;
                })[key];
            };
        },
        formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return "0 Bytes";

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = [
                "Bytes",
                "KB",
                "MB",
                "GB",
                "TB",
                "PB",
                "EB",
                "ZB",
                "YB"
            ];

            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return (
                parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +
                " " +
                sizes[i]
            );
        },
        getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return "";
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        updateQueryString(key, value, url) {
            if (!url) url = window.location.href;
            var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
                hash;

            if (re.test(url)) {
                if (typeof value !== "undefined" && value !== null) {
                    return url.replace(re, "$1" + key + "=" + value + "$2$3");
                } else {
                    hash = url.split("#");
                    url = hash[0].replace(re, "$1$3").replace(/(&|\?)$/, "");
                    if (typeof hash[1] !== "undefined" && hash[1] !== null) {
                        url += "#" + hash[1];
                    }
                    return url;
                }
            } else {
                if (typeof value !== "undefined" && value !== null) {
                    var separator = url.indexOf("?") !== -1 ? "&" : "?";
                    hash = url.split("#");
                    url = hash[0] + separator + key + "=" + value;
                    if (typeof hash[1] !== "undefined" && hash[1] !== null) {
                        url += "#" + hash[1];
                    }
                    return url;
                } else {
                    return url;
                }
            }
        },
        can(permissionName) {
            let hasAccess;
            axios.get(`/permission-check/${permissionName}`)
                .then(()=> {
                    hasAccess = true;
                })
                .catch(()=> {
                    hasAccess = false;
                });

            return hasAccess;
        }
    }
});
