export default {
    data() {
        return {
            isShow: false,
            computedShow: false
        };
    },
    methods: {
        show() {
            this.computedShow = true;
            this.isShow = true;
        },
        hide() {
            this.isShow = false;
            setTimeout(() => {
                this.computedShow = false;
            }, 700);
        }
    }
};
