class Repos {

  data () {
    const get = (props) => props.pagination.items[0]
    const getD = (props) => {
      const r = get(props)
      console.log(r)
      return r
    }

    const tags = []

    return {
      layout: 'post',
      tags: ['posts'], // needed
      pagination: {
        data: 'repos',
        size: 1,
        alias: 'repo',
      },
      permalink: props => `posts/${get(props).permalink_fragment}/index.html`
      ,
      eleventyComputed: {
        title: p => get(p).title || get(p).gh_title || '',
        description: p => get(p).description || get(p).gh_description || '',
        tags: p => [...get(p).tags, ...tags],
      },
    }
  }

  render (props) {
    const { pagination } = props
    const { readme_html } = pagination.items[0]

    return readme_html
  }
}

module.exports = Repos
