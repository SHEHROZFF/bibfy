<template>
    <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
                class="ml-auto mb-0" 
                elevation="0"
                style="transition: all 200ms"
                :color="color"
                v-show="state.citationList.length > 0"
                v-bind="attrs"
                v-on="on"
            >
                Open List
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="text-h5">
                Citations List
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text class="mt-4" ref="citationList">
                <v-card elevation="0" v-for="(citation, idx) in state.citationList" :key="idx">
                    <div
                        class="d-flex flex-row flex-nowrap mt-2"
                        style="align-items: center; overflow: hidden"
                    >
                        <v-card-text>
                            <span v-html="citation" ref="citationItem"></span>
                        </v-card-text>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    icon
                                    elevation="0"
                                    class="mt-1"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="copyCitation(idx)"
                                >
                                    <v-icon>mdi-content-copy</v-icon>
                                </v-btn>
                            </template>
                            <span>Copy Citation</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    icon
                                    elevation="0"
                                    class="mt-1"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="deleteCitation(idx)"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Copy Citation</span>
                        </v-tooltip>
                    </div>
                </v-card>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="copyAll">
                    Copy All
                </v-btn>
                <v-btn text @click="dialog = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import state from "~/state";
export default {
    props: {
        color: String
    },

    computed: {
        state() {
            return state;
        }
    },

    methods: {
        copyCitation(idx) {
            let range = document.createRange();
            range.selectNode(this.$refs.citationItem[idx]);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
        },

        copyAll() {
            let range = document.createRange();
            range.selectNode(this.$refs.citationList);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
        },

        deleteCitation(idx) {
            state.citationList.splice(idx, 1);
        }
    },
    
    data() {
        return {
            dialog: false
        }
    }
}
</script>