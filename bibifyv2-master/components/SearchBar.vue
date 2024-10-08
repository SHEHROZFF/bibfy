<template>
    <div class="d-flex flex-row" style="width: 100%; justify-content: center;">
        <v-text-field
            v-model="search"
            v-debounce:600ms="handleURLKey"
            label="Enter URL/Book Name"
            hide-details="auto"
            :hint="searchHint"
            class="search-bar"
            autocomplete="off"
            spellcheck="false"
            @input="typingHandle"
        >
            <template v-slot:prepend>
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
import processAuthors from "~/assets/processAuthors"
import processDefaultAuthors from "~/assets/processDefaultAuthors"

Vue.use(vueDebounce)

export default {
    data() {
        return {
            search: "",
            searchHint: "Start typing a book title or paste in a URL",
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
            if (this.search === "") {
                return
            }
            this.sourceLoadingTimeout = setTimeout(() => {
                this.sourceLoading = true
            }, 1000)

            let data = {}
            const re = new RegExp("\\b(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?![\"&\'<>])\\S)+)\\b");
            let match = "";
            if (match = this.search.match(re)) {
                // DOI
                this.searchHint = "Searching for DOI..."
                try {
                    data = await this.$axios.$get(
                        `${process.env.BIBSERVER_URL}/doi?url=${match[0]}`
                    )
                    state.type = data.type;
                } catch (e) {
                    state.currentMessage = {
                        type: "error",
                        text: "Error: could not fetch DOI autocitation; check your DOI and try again later."
                    }
                }
                if (data) {
                    state.currentSource = {
                        ...data,
                        license: undefined,
                        funder: undefined,
                        reference: undefined,
                        author: undefined,
                        access_date: new Date().toISOString().slice(0, 10),
                        source_type: "website",
                        url: data.URL,
                        authors: processDefaultAuthors(data.author),
                        idx: 0
                    }
                    console.log(state.currentSource);
                    state.sources = []
                }
            } else if (this.search.startsWith("http://") ||
                this.search.startsWith("https://")) {
                this.searchHint = "Searching for URL..."
                state.type = "webpage"

                try {
                    data = await this.$axios.$get(
                        `${process.env.BIBSERVER_URL}/website?url=${this.search}`
                    )
                } catch (e) {
                    state.currentMessage = {
                      type: "error",
                      text: "Error: could not fetch website autocitation; check your URL and try again later."
                    }
                }
                if (data) {
                    state.currentSource = {
                        ...data,
                        access_date: new Date().toISOString().slice(0, 10),
                        source_type: "website",
                        url: data.URL,
                        authors: processAuthors(data.authors),
                        idx: 0
                    }
                    state.sources = []
                }
            } else {
                this.searchHint = "Searching for book..."
                state.type = "book"
                try {
                    data = await this.$axios.$get(
                        `${process.env.BIBSERVER_URL}/books?q=${this.search}`
                    )
                } catch (e) {
                    state.currentMessage = {
                      type: "error",
                      text: "Error: could not fetch book autocitation; try again later."
                    }
                }
                if (data) {
                    state.sources = data.map((source, idx) => ({
                        ...source,
                        idx,
                        access_date: new Date().toISOString().slice(0, 10),
                        source_type: "book",
                        authors: processAuthors(source.authors)
                    }))
                    state.currentSource = state.sources[0]
                }
            }

            this.searchHint = "Here's your results."
            clearTimeout(this.sourceLoadingTimeout)
            this.sourceLoading = false
            state.getNewCitation()
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
