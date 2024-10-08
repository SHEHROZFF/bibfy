<template>
    <div class="my-3 d-flex" style="align-items: center">
        <div class="d-flex" style="flex: 1" v-if="author.type === 'Person'">
            <v-text-field
                label="First Name"
                v-model="author.first"
                v-debounce:600ms="change"
                class="mr-2"
                hide-details="auto"
                filled
                dense
            />
            <v-text-field
                label="Last Name"
                v-model="author.last"
                v-debounce:600ms="change"
                class="mr-2"
                hide-details="auto"
                filled
                dense
            />
        </div>
        <div class="d-flex" style="flex: 1" v-else>
            <v-text-field
                label="Organization/Full Name"
                v-model="author.full"
                v-debounce:600ms="change"
                class="mr-2"
                hide-details="auto"
                filled
                dense
            />
        </div>
        <v-btn icon @click="changeType">
            <v-icon v-if="author.type === 'Person'">
                mdi-account
            </v-icon>
            <v-icon v-else>
                mdi-domain
            </v-icon>
        </v-btn>
        <v-btn icon @click="addAuthor" v-if="add">
            <v-icon>
                mdi-plus-circle
            </v-icon>
        </v-btn>
        <v-btn icon @click="remove" v-else>
            <v-icon>
                mdi-minus-circle
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    props: {
        add: Boolean,
        value: Object
    },

    watch: {
        value(newValue) {
            console.log(newValue)
            this.author = newValue
        }
    },

    data() {
        return {
            author: this.value || {
                type: "Person",
                first: "",
                last: "",
                full: ""
            }
        }
    },

    methods: {
        addAuthor() {
            this.$emit("add", { ...this.author })
            this.author = {
                type: "Person",
                first: "",
                last: "",
                full: ""
            }
        },

        change() {
            this.$emit("change", this.author)
        },

        changeType() {
            if (this.author.type === "Person") {
                this.author.type = "Organization"
            } else {
                this.author.type = "Person"
            }

            this.change()
        },

        remove() {
            this.$emit("remove")
        }
    }
}
</script>
