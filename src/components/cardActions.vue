<template>
    <div
        class="px-4 py-3 flex-1 flex justify-between sm:justify-end border-t border-gray-200 sm:px-6"
        v-if="modelData"
    >
        <a
            v-if="modelData.backAction"
            :href="modelData.backAction"
            class="mr-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
        >
            Cancel
        </a>
        <button 
         v-show="modelData.state == 'edit'"
            @click.prevent="$emit('delete')"
            class="mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
        >
            Delete
        </button>
        <button @click="avoidWarn"
            v-submission.spinner="refs"
            type="submit" 
            name="_redirect" value="false"
            class="mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
            Save & Close
        </button>
        <button @click="avoidWarn"
            v-submission.spinner="refs"
            type="submit" 
             name="_redirect" value="true"
            class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
            Save
        </button>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
    },
    data() {
        return {
            modelData: null,
            refs: []
        }
    },
    methods: {
        avoidWarn() {
            window.enablePageChangeWarn = true
        },
        walkAParent(parent, callback) {
            callback(parent)

            parent = parent.$parent
            if (parent) {
                this.walkAParent(parent, callback) 
            }
        }
    },
    mounted() {

        this.modelData = this.data ? this.data : this.$window._data
        
        this.walkAParent(this.$parent, (parent) => {
            if (parent.$refs) {
                _.forEach(parent.$refs, (ref) => {
                    this.refs.push(ref)
                })
            }
        })
    }
};
</script>

<style></style>
