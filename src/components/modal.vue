<template>
  <div
    v-show="computedShow"
    class="z-50 fixed bottom-0 inset-x-0 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center overflow-y-auto"
  >
    <transition
      name="background"
      enter-class="opacity-0"
      enter-active-class="ease-out duration-300"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-to-class="opacity-0"
    >
      <div v-show="isShow" class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>

    <transition
      name="modal"
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-if="isShow"
        class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-y-auto h-screen sm:h-auto shadow-xl transform transition-all sm:w-full sm:p-6"
        :class="`max-w-${maxWidth}`"
      >
        <div>
          <div
            class="mb-3 mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
            v-if="hasSlot('header')"
          >
            <slot name="header"></slot>
          </div>
          <div class="text-center sm:mt-5">
            <h3 v-if="title" class="text-lg leading-6 font-medium text-gray-900">{{ title || 'Title' }}</h3>
            <div class="mt-2" v-if="subtitle">
              <p class="text-sm leading-5 text-gray-500">{{ subtitle || 'Subtitle' }}</p>
            </div>
            <div class="mt-2">
              <p class="text-sm leading-5 text-gray-500">
                <slot></slot>
              </p>
            </div>
          </div>
        </div>
        <div
          class="mt-5 sm:mt-6 sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
          :class="[hasCancel ? 'sm:grid' : '']"
        >
          <span class="flex w-full rounded-md shadow-sm sm:col-start-2">
            <button-spinner
              @click.native="$emit('ok')"
              type="button"
              :is-loading="isOkLoading" 
              :disabled="isOkLoading"
              class="h-100 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >{{ okLabel || 'Okay' }}</button-spinner>
          </span>
          <span
            class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1"
            v-if="hasCancel"
          >
            <button
              @click="hide()"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >{{ cancelLabel || 'Cancel' }}</button>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import visi from 'v-essentials/src/mixins/hasVisibility'

export default {
  mixins: [visi],
  props: {
    maxWidth: {
      type: String,
      default: 'lg'
    },
    hasCancel: {
      type: Boolean,
      default: true
    },
    isOkLoading: {
      type: Boolean,
      default: false
    },
    okLabel: String,
    cancelLabel: String,
    title: String,
    subtitle: String,
  },
};
</script>