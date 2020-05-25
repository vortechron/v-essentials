<template>
    <div>
        <div class="py-1">
            <a
                @click="submitSort(name)"
                href="#"
                class="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                :class="[
                    getParameterByName('sort') == name
                        ? 'bg-gray-100 text-gray-900'
                        : ''
                ]"
                >{{ label }} {{ asc || '(Ascending)' }}</a
            >
            <a
                @click="submitSort('-' + name)"
                href="#"
                class="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                :class="[
                    getParameterByName('sort') == '-' + name
                        ? 'bg-gray-100 text-gray-900'
                        : ''
                ]"
                >{{ label }} {{ desc || '(Descending)' }}</a
            >
        </div>
        <div class="border-t border-gray-100"></div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        label: String,
        asc: String,
        desc: String
    },
    methods: {
        submitSort(value) {
            window.location.href = this.updateQueryString('sort', value)
        }
    },
    mounted() {
        this.sortChecked = this.getParameterByName("sort");
    }
};
</script>

<style></style>
