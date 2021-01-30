<template>
    <div>
        <sidebar :logo="logo" class="sidebar-text-white" ref="sidebar">
            <div class="px-2">
                <vnodes v-for="node in $slots.nav" :node="node"></vnodes>
            </div>
        </sidebar>

        <div
            class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow"
            v-if="!noNavbar"
        >
            <button
                @click="$refs.sidebar.show()"
                class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
                aria-label="Open sidebar"
            >
                <svg
                    class="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h7"
                    ></path>
                </svg>
            </button>
            <div class="flex-1 px-4 flex" :class="[hasSearch ? 'justify-between' : 'justify-end']">
                <search-bar :endpoint="searchEndpoint" @search="$emit('search', $event)" v-if="hasSearch"></search-bar>
                <div class="ml-4 flex items-center md:ml-6">
                    <div class="relative mt-1">

                    <button
                        @click="$emit('eye')"
                        class="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring focus:text-gray-500 "
                        aria-label="Notifications"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                    </div>

                    <!-- Profile dropdown -->
                    <div
                        v-if="!hideProfileDropdown"
                        class="ml-3 relative"
                    >
                        <div>
                            <button
                                @click="profileShow = !profileShow"
                                class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring"
                                id="user-menu"
                                aria-label="User menu"
                                aria-haspopup="true"
                                x-bind:aria-expanded="open"
                                aria-expanded="false"
                            >
                                <slot name="avatar">
                                    <img
                                        class="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                        alt=""
                                    />
                                </slot>
                            </button>
                        </div>

                        <dropdown :is-show="profileShow">
                            <slot name="profile"></slot>
                        </dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div class="container max-w-screen-xl mx-auto min-h-screen py-8">
            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-3 hidden md:block">
                    <nav>
                        <slot name="nav"></slot>
                    </nav>
                </div>
                <div class="col-span-12 md:col-span-9">
                    <main>
                        <slot></slot>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sidebar from './sidebar'
import searchBar from './searchBar'

export default {
    components: {sidebar, searchBar},
    props: {
        noNavbar: Boolean,
        hasSearch: Boolean,
        searchEndpoint: String,
        noNotification: Boolean,
        hideProfileDropdown: Boolean,
        logo: String
    },
    data() {
        return {
            profileShow: false,
            notiShow: false,
        }
    }
};
</script>

<style></style>
