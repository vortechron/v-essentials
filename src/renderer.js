import Vue from 'vue'

export default {
	props: {
		html: {
			type: String,
			default: "",
		},
	},
	data() {
		return { templateRender: undefined };
	},
	watch: {
		html: {
			handler() {
				this.updateRender()
			},
			immediate: true
		}
	},
	methods: {
		updateRender() {
			const compiled = Vue.compile(this.html);
			this.templateRender = compiled.render;
			this.$options.staticRenderFns = [];

			for (const staticRenderFunction of compiled.staticRenderFns) {
				this.$options.staticRenderFns.push(staticRenderFunction);
			}
		},
	},
	render() {
		return this.templateRender();
	},
};