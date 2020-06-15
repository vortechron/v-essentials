<template>
    <div>
        <div @click="tableClicked" v-if="dataItems.length != 0">
            <slot></slot>
        </div>
        <div v-else class="flex items-center justify-center">
            <div class="py-1/5 text-center">
                <span class="material-icons-two-tone text-6xl">inbox</span> 
                <div class="font-semibold text-gray-500 tracking-tight">
                Nothing to show yet
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        items: [Array, Object],
        actionsRef: String
    },
    data() {
        return {
            motherCheckbox: null,
            checkboxes: [],
            dataItems: this.items,
            selectedIndex: [],
            selectedItems: []
        }
    },
    watch: {
        motherCheckbox(value) {
        }
    },
    methods: {
        getAllCheckboxes() {
            return this.$el.querySelectorAll('.tableable');
        },
        syncCheckboxes() {
            let checkboxes = this.getAllCheckboxes()

            if (checkboxes) {
                let indexes = []

                _.forEach(checkboxes, (node, index) => {
                    if (node.checked) {
                        indexes.push(index)
                    }
                })

                this.syncItemsWithIndexes(indexes)
                this.setMotherIndeterminate();
            }
        },
        setMotherIndeterminate() {
            let checkboxes = this.getAllCheckboxes() || []

            if (this.selectedIndex.length == 0) {
                this.motherCheckbox.indeterminate = false
            } else if (this.selectedIndex.length < checkboxes.length) {
                this.motherCheckbox.indeterminate = true
            } else if (this.selectedIndex.length == checkboxes.length) {
                this.motherCheckbox.indeterminate = false
                this.motherCheckbox.checked = true
            }
        },
        setStateAllCheckboxes(state) {
            let checkboxes = this.getAllCheckboxes()

            if (checkboxes) {
                let indexes = []

                _.forEach(checkboxes, (node, index) => {
                    node.checked = state

                    if (state) {
                        indexes.push(index)
                    }
                })

                this.syncItemsWithIndexes(indexes)
            }
        },
        setStateCheckboxesByIndexes(state, indexes) {
            let checkboxes = this.getAllCheckboxes()

            if (checkboxes) {
                _.forEach(checkboxes, (node, index) => {
                    if (indexes.includes(index)) node.checked = state
                })
            }
        },
        tableClicked() {
            if (! this.motherCheckbox) return
            
            this.syncCheckboxes()
        },
        syncItemsWithIndexes(indexes) {
            this.selectedItems = [];
            _.forEach(this.dataItems || [], (item, index) => {
                if (indexes.includes(index)) {
                    this.selectedItems.push(item);
                }
            })

            this.selectedIndex = indexes;
        },
        whereItems(objConditional) {
            let indexes = _.keys(_.pickBy(this.dataItems, objConditional));

            if (indexes.length > 0) {
                indexes = _.map(indexes, (item) => {
                    return parseInt(item)
                })
                this.setStateAllCheckboxes(false);
                this.syncItemsWithIndexes(indexes);
                this.setStateCheckboxesByIndexes(true, indexes)
            }
        }
    },
    mounted() {
        let tableableActions = this.$root.$refs[this.actionsRef]

        if (! Array.isArray(this.items)) {
            this.dataItems = this.items.data
        }

        if (tableableActions) {
            this.motherCheckbox = tableableActions.$refs['motherCheckbox'];

            if (this.motherCheckbox) {
                this.motherCheckbox.addEventListener("click", (el) => {
                    this.setStateAllCheckboxes(el.target.checked)
                });
            }
        }
    }
}
</script>

<style>

</style>