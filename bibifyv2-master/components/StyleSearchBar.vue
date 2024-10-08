<template>
    <div class="d-flex flex-row" style="width: 100%; justify-content: center;">
        <v-text-field
            v-model="search"
            v-debounce:600ms="handleURLKey"
            label="Search citation styles"
            :hint="searchHint"
            hide-details="auto"
            class="search-bar"
            autocomplete="off"
            spellcheck="false"
            @input="typingHandle"
            outlined
            dense
        >
            <template v-slot:append>
                <v-progress-circular
                    indeterminate
                    color="primary"
                    v-if="sourceLoading"
                    style="width: 24px; height: 24px;"
                />
                <v-icon v-else>
                    mdi-magnify
                </v-icon>
            </template>
        </v-text-field>
    </div>
</template>

<script>
import Vue from "vue"
import vueDebounce from "vue-debounce"
import state from "~/state"

Vue.use(vueDebounce)

export default {
    data() {
        return {
            search: "",
            searchHint: "Start typing to search 9000+ styles...",
            sourceLoading: false,
            sourceLoadingTimeout: null
        }
    },

    computed: {
        state() {
            return state
        }
    },

    methods: {
        typingHandle() {
            this.searchHint = "Waiting for you to stop typing..."
            this.sourceLoading = false
        },

        async handleURLKey() {
            const search = encodeURIComponent(this.search)
            const data = await this.$axios.$get(
                `${process.env.BIBSERVER_URL}/styles/search?q=${search}&limit=20`
            )
            this.$emit("search", data)
            this.searchHint = ""
        }
    }
}
</script>

<style>
.search-bar {
    max-width: 760px;
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
}
</style>
