<template>
    <div class="text-left">
        <h3 class="font-weight-light">Info</h3>
        <v-divider class="mb-3" style="width: 40%" />
        <v-text-field
            v-for="field in state.infoFields"
            :key="field.field"
            :label="field.label"
            v-model="state.currentSource[field.field]"
            hide-details="auto"
            class="mb-3"
            autocomplete="off"
            spellcheck="false"
            v-debounce:600ms="handleFormEdit"
            filled
            dense
        />
        <h3 class="mt-10 font-weight-light">Publisher Info</h3>
        <v-divider class="mb-3" style="width: 40%" />
        <v-text-field
            v-for="field in state.publisherFields"
            :key="field.field"
            :label="field.label"
            v-model="state.currentSource[field.field]"
            hide-details="auto"
            class="mb-3"
            autocomplete="off"
            spellcheck="false"
            v-debounce:600ms="handleFormEdit"
            filled
            dense
        />
        <h3 class="mt-10 font-weight-light">Authors</h3>
        <v-divider class="mb-3" style="width: 40%" />
        <AuthorField
            v-for="(author, idx) in state.currentSource.authors"
            :key="idx"
            :value="author"
            @remove="removeAuthor(idx)"
            @change="(data) => changeAuthor(idx, data)"
        />
        <AuthorField
            add
            @add="addAuthor"
        />
        <div class="mt-10 d-flex">
            <h3 class="mr-2 font-weight-light">Other Info</h3>
            <v-btn elevation="0" @click="toggleOtherFields" icon>
                <v-icon v-if="showOtherFields.length === 0">
                    mdi-chevron-down
                </v-icon>
                <v-icon v-else>
                    mdi-chevron-up
                </v-icon>
            </v-btn>
        </div>
        <v-divider class="mb-3" style="width: 40%" />
        <v-expansion-panels v-model="showOtherFields" multiple>
            <v-expansion-panel accordion>
                <v-expansion-panel-content>
                    <v-text-field
                        v-for="field in state.otherFields"
                        :key="field.field"
                        :label="field.label"
                        v-model="state.currentSource[field.field]"
                        hide-details="auto"
                        v-debounce:600ms="handleFormEdit"
                        class="mb-3"
                        autocomplete="off"
                        spellcheck="false"
                        filled
                        dense
                    />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
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
            showOtherFields: []
        }
    },

    computed: {
        state() {
            return state
        },
    },

    methods: {
        toggleOtherFields() {
            if (this.showOtherFields.length === 0) {
                this.showOtherFields = [0]
            } else {
                this.showOtherFields = []
            }
        },

        handleFormEdit() {
            state.getNewCitation()
        },

        addAuthor(author) {
            state.currentSource.authors.push(author)
            state.getNewCitation()
        },

        changeAuthor(idx, author) {
            state.currentSource.authors[idx] = author
            state.getNewCitation()
        },

        removeAuthor(idx) {
            state.currentSource.authors.splice(idx, 1)
            state.getNewCitation()
        }
    }
}
</script>

<style scoped>
h3 {
    font-size: 1.40rem;
}

.v-expansion-panel::before {
    box-shadow: none !important;
}

.v-expansion-panel-content {
    margin: 0 -24px -16px;
}
</style>
