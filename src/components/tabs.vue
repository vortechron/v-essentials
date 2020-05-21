<template>
    <div>
        <tab-nav class="mb-4" :col="tabs.length">
            <tab-nav-button v-for="(tab, index) in tabs" :key="tab.title" :title="tab.title" :is-active="index == selectedIndex" @click.native="selectTab(index)"></tab-nav-button>
        </tab-nav>

        <slot name="middle"></slot>
        <!-- <span class="relative z-0 flex flex-wrap mt-5">
            <button
                v-for="(tab, index) in tabs"
                :key="tab.title"
                @click="selectTab(index)"
                :class="{
                    'bg-gray-400': index == selectedIndex,
                    'bg-white': index != selectedIndex,
                    'rounded-l-md': index == 0,
                    '-ml-px': index != 0,
                    'rounded-r-md': index == tabs.length - 1
                }"
                type="button"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
                <vnodes v-if="tab.$slots.icon" :vnodes="tab.$slots.icon[0]"/>
                {{ tab.title }}
            </button>
        </span> -->
        <slot></slot>
    </div>
</template>

<script>

export default {
    components: {
        Vnodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes
        }
    },
    props: {
        initialIndex: Number,
        selectIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            selectedIndex: this.selectIndex, // the index of the selected tab,
            tabs: [] // all of the tabs
        };
    },
    mounted() {
        this.$children.forEach((item) => {
            if (item.$options._componentTag == 'tab' || item.$options._componentTag == 'tab-blank') this.tabs.push(item)
        })

        this.selectTab(this.initialIndex || 0);
    },
    methods: {
        selectTab(i) {
            this.selectedIndex = i;

            this.tabs.forEach((tab, index) => {
                tab.isActive = index === i;
            });
        }
    }
};
</script>

<style lang="css"></style>
