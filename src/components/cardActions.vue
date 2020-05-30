<template>
    <div
        class="px-4 py-3 flex-1 flex justify-between sm:justify-end border-t border-gray-200 sm:px-6"
        v-if="modelData"
    >
        <btn
            theme="white"
            v-if="modelData.backAction"
            :href="modelData.backAction"
            class="mr-2"
        >
            Cancel
        </btn>
        <btn 
            color="red"
         v-show="modelData.state == 'edit' && !noDelete"
            @click.prevent.native="$emit('delete')"
            class="mr-2"
        >
            Delete
        </btn>
        <btn @click.native="save"
            v-show="!noSaveAndClose"
            v-submission.spinner="refs"
            type="submit" 
            name="_redirect" value="false"
            class="mr-2"
        >
            Save & Close
        </btn>
        <btn @click.native="save"
            :id="saveId"
            v-submission.spinner="refs"
            type="submit" 
             name="_redirect" value="true"
        >
            {{ saveLabel || 'Save' }}
        </btn>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        noDelete: {
            type: Boolean,
            default: false
        },
        noSaveAndClose: {
            type: Boolean,
            default: false
        },
        saveId: String,
        isPreventDefault: {
            type: Boolean,
            default: false
        },
        saveLabel: String
    },
    data() {
        return {
            modelData: null,
            refs: []
        }
    },
    methods: {
        save(e) {
            this.avoidWarn()

            if (this.isPreventDefault) {
                e.preventDefault()
            }

            this.$emit('save', e)
        },
        avoidWarn(e) {
            window.enablePageChangeWarn = false
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
