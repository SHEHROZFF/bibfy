<template>
    <main class="mx-3 text-center" style="max-width: 100vw; overflow: hidden">
        <v-container class="mx-10 my-10" style="max-width: 760px;">
            <v-scroll-y-reverse-transition>
                <v-alert
                    :key="0"
                    v-if="state.currentMessageOpen"
                    v-model="state.currentMessageOpen"
                    :type="state.currentMessageType"
                    class="alert"
                    dismissible
                >
                    {{ state.currentMessage.text }}
                </v-alert>
            </v-scroll-y-reverse-transition>
            <h1 class="text-h2 mb-3">
                Bibify
            </h1>
            <h2 class="text-subtitle-1">
                the free, open source, fast citation generator.
            </h2>
            <div class="d-flex mt-1" style="justify-content: center">
                <a
                    href="https://gitlab.com/bibify/bibifyv2"
                    class="mx-2"
                    style="width: 40px"
                >
                    Source
                </a>
                <a
                    href="https://gitlab.com/bibify/bibserver/-/wikis/home"
                    class="mx-2"
                    style="width: 40px"
                >
                    API
                </a>
            </div>
            <SearchBar />
            <SourceCard />
            <CiteCard />
            <div class="my-5">
                <v-scroll-x-transition leave-absolute>
                    <div class="d-flex" v-if="state.manualCite" key="1">
                        <v-btn class="mr-4" color="primary" @click="toggleManualCite">
                            &larr; Autocite
                        </v-btn>
                        <v-select
                            label="Type"
                            v-model="state.type"
                            :items="state.citationTypes"
                            item-text="label"
                            item-value="type"
                            hide-details="auto"
                            solo
                            dense
                            class="ml-auto type-select"
                        />
                    </div>
                    <div class="d-flex" v-else key="2">
                        <v-btn class="mx-auto" @click="toggleManualCite">
                            Manual Cite
                        </v-btn>
                    </div>
                </v-scroll-x-transition>
            </div>
            <v-expand-transition>
                <ManualCiteForm v-show="state.manualCite" />
            </v-expand-transition>
        </v-container>
        <Footer />
    </main>
</template>

<script>
import state from "~/state"

export default {
    async mounted() {
        const timeout = setTimeout(() => {
            state.currentMessage = {
                type: "warning",
                text: "Bibify's backend runs on free Cloud Functions, which can take some time to warm up. Citations may be slow for the next ~30 seconds."
            }
        }, 2000)
        await state.fetchFields()
        clearTimeout(timeout)
    },

    computed: {
        state()  {
            return state
        }
    },

    data() {
        return {
            fields: []
        }
    },

    methods: {
        toggleManualCite() {
            state.manualCite = !state.manualCite
        },

        selectType(citationType) {
            console.log(event)
            state.type = citationType.type
        },
    }
}
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}

html, body {
    overflow-y: auto;
}

a {
    text-decoration: none;
}

.alert {
    position: fixed;
    top: 2rem;
    left: 12.5%;
    right: 12.5%;
    text-align: left;
    z-index: 999;
}

.type-select {
    max-width: 200px;
    height: 36px;
}

@media (max-width: 500px) {
    .type-select {
        max-width: 50%;
    }
}
</style>
