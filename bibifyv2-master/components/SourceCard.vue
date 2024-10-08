<template>
    <v-card v-if="state.currentSource.title" class="my-5 pb-1 pt-3">
        <v-row class="mx-3 px-2 py-2 source-row pb-7 flex-nowrap">
            <div class="source-thumbnail">
                <img :src="thumbnail">
            </div>
            <div>
                <v-card-title>
                    {{ state.currentSource.title }}
                </v-card-title>
                <v-card-subtitle class="pb-0">
                    {{ authors }},&nbsp;
                    {{ state.currentSource.date || "Unknown Date" }} &middot;&nbsp;
                    {{ state.currentSource.publisher || "Unknown Publisher" }}
                </v-card-subtitle>
                <v-card-text class="pb-0" v-if="state.sources.length > 1">
                    <a href="#" style="text-decoration: none" @click="toggleOtherResults">
                        Show Other Results
                    </a>
                </v-card-text>
            </div>
        </v-row>
        <v-expansion-panels v-model="showOtherResults" multiple>
            <v-expansion-panel accordion>
                <v-expansion-panel-content>
                    <v-divider class="mb-3"></v-divider>
                    <v-card
                        @click="chooseSource(source.idx)"
                        v-for="source in otherSources"
                        :key="source.idx"
                        elevation="0"
                        class="px-2 py-2 source-card"
                    >
                        <h4 class="font-weight-regular">
                            {{ source.title }}
                        </h4>
                        <p class="text-body-2 mb-0 grey--text text--darken-2">
                            {{ authorsFormatted(source.authors) }},&nbsp;
                            {{ source.date || "Unknown Date" }} &middot;&nbsp;
                            {{ source.publisher || "Unknown Publisher" }}
                        </p>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>
import Vue from "vue"
import vueDebounce from "vue-debounce"
import state from "~/state"

Vue.use(vueDebounce)

export default {
    data() {
        return {
            showOtherResults: []
        }
    },

    computed: {
        state() {
            return state
        },

        thumbnail() {
            if (state.currentSource.thumbnail) {
                return state.currentSource.thumbnail
            } else {
                return "https://picsum.photos/200/200"
            }
        },

        authors() {
            return this.authorsFormatted(state.currentSource.authors || [])
        },

        otherSources() {
            return state.sources.filter((source, idx) => idx !== state.currentSource.idx)
        }
    },

    methods: {
        authorToText(author) {
            if (!author) {
                return ""
            }

            if (author.type === "Person") {
                return `${author.first} ${author.last}`
            } else if (author.type) {
                return `${author.full}`
            } else {
                return ""
            }
        },

        toggleOtherResults() {
            console.log("yeet")
            if (this.showOtherResults.length > 0) {
                this.showOtherResults = []
            } else {
                this.showOtherResults = [0]
            }
        },

        authorsFormatted(authorsRaw) {
            if (authorsRaw.length === 0) {
                return "Unknown Author(s)"
            }
            if (authorsRaw.length === 1) {
                return this.authorToText(authorsRaw[0])
            } else if (authorsRaw.length === 2) {
                return `${this.authorToText(
                    authorsRaw[0]
                )} & ${this.authorToText(authorsRaw[1])}`
            } else {
                return `${this.authorToText(authorsRaw[0])} et al.`
            }
        },

        chooseSource(idx) {
            state.currentSource = state.sources[idx]
            state.getNewCitation()
            this.showOtherResults = []
        }
    }
}
</script>

<style scoped>
.source-thumbnail {
    height: 64px;
}

.source-thumbnail > img {
    height: 72px;
    max-width: 72px;
    width: auto;
}

.v-card {
    text-align: left;
    width: 100%;
}

.source-row {
    align-items: center;
}

.v-expansion-panel::before {
    box-shadow: none !important;
}

.source-card:hover {
    transition: all 300ms;
}

.source-card:hover {
    background-color: #EEEEEE;
}
</style>
