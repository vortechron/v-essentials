<template>
    <div>
        <tab-nav class="mb-4" :col="tabs.length">
            <tab-nav-button v-for="(tab, index) in tabs" :key="tab.title" :title="tab.title" :is-active="index == selectedIndex" @click.native="selectTab(index)"></tab-nav-button>
        </tab-nav>

        <slot name="middle"></slot>

        <slot></slot>
    </div>
</template>

<script>

export default {
    props: {
        initialIndex: Number
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
