<template>
    <v-card>
        <v-card-text class="pt-5">
            <v-progress-linear
                v-if="state.citationLoading"
                class="ml-2 mt-2 mb-4"
                indeterminate
            />
            <div
                v-else-if="state.currentCitation"
                class="ml-2"
                style="color: black"
                v-html="state.currentCitation"
                ref="citationText"
            >
            </div>
            <span v-else class="ml-2">
                <em>Your citation will appear here...</em>
            </span>
            <div
                class="d-flex flex-row flex-nowrap mt-2"
                style="align-items: center; overflow: hidden"
            >
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            elevation="0"
                            class="mt-1"
                            v-bind="attrs"
                            v-on="on"
                            @click="addCurrentCitationToList"
                        >
                            <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                    </template>
                    <span>Add to List</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            elevation="0"
                            class="mt-1"
                            v-bind="attrs"
                            v-on="on"
                            @click="copy"
                        >
                            <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                    </template>
                    <span>Copy Citation</span>
                </v-tooltip>
                <v-tabs
                    class="ml-2"
                    v-model="tabIdx"
                    next-icon="mdi-arrow-right"
                    prev-icon="mdi-arrow-left"
                    show-arrows
                >
                    <v-tab
                        v-for="(style, idx) in shortStyles"
                        :key="idx"
                        @click="chooseStyle(idx)"
                    >
                        {{ style.citationShortName || style.citationName }}
                    </v-tab>
                    <v-tab @click="toggleMoreStyles">
                        <span v-if="showMoreStyles.length === 0">
                            More
                        </span>
                        <span v-else>
                            Less
                        </span>
                    </v-tab>
                </v-tabs>
                <CitationList :color="citationListButtonColor" />
            </div>
            <v-expansion-panels v-model="showMoreStyles" multiple>
                <v-expansion-panel accordion>
                    <v-expansion-panel-content class="mt-3">
                        <v-divider class="mb-3" />
                        <StyleSearchBar
                            @search="handleStyleSearchResults"
                        />
                        <v-card
                            v-for="(style, idx) in otherStyles"
                            :key="idx"
                            @click="selectOtherStyle(style.styleIdx)"
                            elevation="0"
                            class="px-2 py-2 style-card"
                        >
                            <h4 class="font-weight-regular">
                                {{ style.citationName }}
                            </h4>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<script>
import state from "~/state"

export default {
    async fetch() {
        console.log(process.env.BIBSERVER_URL);
        const data = await this.$axios.$get(`${process.env.BIBSERVER_URL}/styles`);
        this.citationStyles = data.citationStyles;
        state.currentCitationFile = this.citationStyles[0].citationFile || "";
    },
    computed: {
        state() {
            return state;
        },
        shortStyles() {
            const shortStyles = this.citationStyles.slice(0, 3).map((style) => {
                const mla9 = "Modern Language Association 9th edition";
                const mla7 = "Modern Language Association 7th edition";
                // This is necessary because by default bibserver
                // reports both styles as MLA
                if (style.citationName === mla9) {
                    return {
                        ...style,
                        citationShortName: "MLA 9"
                    };
                }
                else if (style.citationName === mla7) {
                    return {
                        ...style,
                        citationShortName: "MLA 7"
                    };
                }
                else if (!style.citationShortName &&
                    style.citationName.split(" ").length > 1) {
                    return {
                        ...style,
                        citationShortName: style.citationName.split(" ")[0]
                    };
                }
                else {
                    return style;
                }
            });
            return shortStyles;
        },
        otherStyles() {
            const otherStyles = this.citationStyles.slice(3).map((style, idx) => {
                return {
                    ...style,
                    styleIdx: idx + 3
                };
            });
            console.log(otherStyles);
            return otherStyles;
        }
    },
    data() {
        return {
            showCitationList: [],
            showMoreStyles: [],
            citationStyles: [],
            currentStyleIdx: 0,
            tabIdx: 0,
            citationListButtonColor: "",
        };
    },
    watch: {
        tabIdx(thing) { console.log(thing); }
    },
    methods: {
        copy() {
            let range = document.createRange();
            range.selectNode(this.$refs.citationText);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
        },
        toggleMoreStyles() {
            if (this.showMoreStyles.length > 0) {
                this.showMoreStyles = [];
            }
            else {
                this.showMoreStyles = [0];
            }
        },
        chooseStyle(idx) {
            if (this.citationStyles[idx]) {
                state.currentCitationFile = this.citationStyles[idx].citationFile;
                this.currentStyleIdx = idx;
            }
        },
        selectOtherStyle(idx) {
            const style = this.citationStyles[idx];
            const otherStyle = this.citationStyles[this.currentStyleIdx];
            const citationStyles = [...this.citationStyles];
            citationStyles[this.currentStyleIdx] = style;
            citationStyles[idx] = otherStyle;
            this.citationStyles = citationStyles;
            this.showMoreStyles = [];
            this.tabIdx = this.currentStyleIdx;
            this.chooseStyle(this.currentStyleIdx);
        },
        handleStyleSearchResults(results) {
            this.citationStyles = [
                ...this.citationStyles.slice(0, 3),
                ...results
            ];
        },
        addCurrentCitationToList() {
            if (!state.currentCitation)
                return;

            // Keep list in alphabetic order
            state.citationList.push(state.currentCitation);
            state.citationList.sort();

            // Flash the Open List button
            this.citationListButtonColor = "primary";
            window.setTimeout(() => {
                this.citationListButtonColor = "";
            }, 200);
        },
    },
}
</script>

<style scoped>
.v-card {
    text-align: left;
}

.v-expansion-panel::before {
    box-shadow: none !important;
}

.style-card:hover {
    transition: all 300ms;
}

.style-card:hover {
    background-color: #EEEEEE;
}
</style>
