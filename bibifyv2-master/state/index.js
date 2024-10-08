import Vue from "vue"
import qs from "qs"

const state = new Vue({
  data() {
    return {
      type: "book",
      manualCite: false,
      sources: [],
      currentSource: {
        authors: []
      },
      currentMessageOpen: false,
      currentMessage: {
        type: "none",
        text: ""
      },
      citationTypes: [
        {
          label: "Book",
          type: "book"
        },
        {
          label: "Website",
          type: "webpage"
        },
        {
          label: "Journal",
          type: "article-journal"
        },
        {
          label: "Article",
          type: "article"
        },
        {
          label: "Podcast",
          type: "song"
        },
        {
          label: "Personal Communication",
          type: "personal_communication"
        },
        {
          label: "Speech",
          type: "speech"
        },
        {
          label: "Broadcast",
          type: "broadcast"
        },
        {
          label: "Report",
          type: "report"
        },
      ],
      fields: [],
      currentCitation: "",
      citationList: [],
      showCitationList: [],
      citationTimeout: null,
      citationLoading: false,
      citationLoadingTimeout: null,
      citations: [],
      currentSearch: "",
      currentCitationFile: "",
      currentStyle: 0
    }
  },

  watch: {
    async currentCitationFile() {
      if (this.currentSource.title) {
        await this.getNewCitation()
      }
    },

    type() {
      if (this.type !== "book" && this.type !== "webpage") {
        this.currentMessage = {
          type: "warning",
          text: "This citation type is in beta. Use with caution."
        }
      }
    },

    currentMessage() {
      if (this.currentMessage.type !== "none") {
        this.currentMessageOpen = true
      } else {
        this.currentMessageOpen = false
      }
    }
  },

  methods: {
    async fetchFields() {
      const type = this.type !== "auto" ? this.type : "book"
      const res = await fetch(
        `${process.env.BIBSERVER_URL}/fields/${type}`
      )

      if (res.ok) {
        this.fields = await res.json()
      } else {
        console.error("Field fetch failed!")
        state.currentMessage = {
          type: "error",
          text: "Error: could not fetch citation fields. Backend is probably down; try later."
        }
      }

      this.fields = this.fields.map((field) => {
        if (field.field === "issued") {
          field.label = "Publish Date"
          field.field = "date"
        } else if (field.field === "publisher-place") {
          field.label = "Publisher Location"
        }
        return field
      })
    },

    async getNewCitation() {
      const source = {
        ...this.currentSource,
        style: this.currentCitationFile || "modern-language-association.csl",
        type: this.type !== "auto" ? this.type : "book"
      }

      this.citationLoading = false
      this.citationLoadingTimeout = setTimeout(() => {
        this.citationLoading = true
      }, 1000)

      console.log(source)

      const res = await fetch(
        `${process.env.BIBSERVER_URL}/cite?${qs.stringify(source, { format: "RFC3986" })}`
      )

      if (res.ok) {
        const citation = await res.json()
        this.currentCitation = citation[0]
      } else {
        console.error("cite failed", res)
        state.currentMessage = {
          type: "error",
          text: "Error: could not fetch citation. Backend is probably down; try later."
        }
      }

      clearTimeout(this.citationLoadingTimeout)
      this.citationLoading = false
    },

  },

  computed: {
    infoFields() {
      const type = this.type !== "auto" ? this.type : "book"
      return this.fields.filter(field => {
        switch (field.field) {
          case "title":
            return true
          case "edition":
          case "volume":
            return type === "book"
          case "URL":
            return type === "webpage"
          default:
            return false
        }
      })
    },

    publisherFields() {
      return this.fields.filter(field => {
        switch (field.field) {
          case "publisher":
          case "publisher-place":
          case "date":
            return true
          default:
            return false
        }
      })
    },

    currentMessageType() {
      return this.currentMessage.type === "none" ? "success" : this.currentMessage.type
    },

    otherFields() {
      return this.fields.filter((field) => {
        return !(this.publisherFields.includes(field) || this.infoFields.includes(field))
      })
    }
  }
})

if (process.browser && !window.__state) {
  process.env.NODE_ENV === "development" &&
    Object.defineProperty(window, "__state", { get: () => state })
}

export default state
