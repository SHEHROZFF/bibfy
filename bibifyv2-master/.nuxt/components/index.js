export const AuthorField = () => import('../..\\components\\AuthorField.vue' /* webpackChunkName: "components/author-field" */).then(c => wrapFunctional(c.default || c))
export const CitationList = () => import('../..\\components\\CitationList.vue' /* webpackChunkName: "components/citation-list" */).then(c => wrapFunctional(c.default || c))
export const CiteCard = () => import('../..\\components\\CiteCard.vue' /* webpackChunkName: "components/cite-card" */).then(c => wrapFunctional(c.default || c))
export const Footer = () => import('../..\\components\\Footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c))
export const ManualCiteForm = () => import('../..\\components\\ManualCiteForm.vue' /* webpackChunkName: "components/manual-cite-form" */).then(c => wrapFunctional(c.default || c))
export const SearchBar = () => import('../..\\components\\SearchBar.vue' /* webpackChunkName: "components/search-bar" */).then(c => wrapFunctional(c.default || c))
export const SourceCard = () => import('../..\\components\\SourceCard.vue' /* webpackChunkName: "components/source-card" */).then(c => wrapFunctional(c.default || c))
export const StyleSearchBar = () => import('../..\\components\\StyleSearchBar.vue' /* webpackChunkName: "components/style-search-bar" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
