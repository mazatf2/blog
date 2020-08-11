const Cache = require('@11ty/eleventy-cache-assets')
const { Base64 } = require('js-base64')
const MarkdownIt = require('markdown-it')

const md = new MarkdownIt()
const repos = require('./_repos.json')

module.exports = function () {
  return new Promise(async (resolve) => {
    const output = []

    for (const repo of repos) {
      let entry = {
        readme_html: '',
        gh_topics: [],
        gh_title: '',
        gh_description: '',

        title: '',
        description: '',
        permalink_fragment: '',
        repo_gh_url: '',
        tags: [],
        ...repo,
      }

      if (repo.repo_gh_url === '') throw new Error('repo.url not set')

      try {
        // https://api.github.com/repos/mazatf2/tf2-comp-userscripts
        const url = new URL('https://api.github.com/repos/' + repo.repo_gh_url)

        // https://docs.github.com/en/rest/reference/repos#get
        let repoInfo = await Cache(url, {
          duration: '1d',
          type: 'json',
        })

        let readme = await Cache(
          url + '/readme', {
            duration: '1d',
            type: 'json',
          })

        output.push({
            ...entry,
            readme_html: md.render(Base64.decode(readme.content)),
            gh_topics: repoInfo.topics,
            gh_title: repoInfo.name,
            gh_description: repoInfo.description,
          },
        )

      } catch (e) {
        throw e
      }
    }
    resolve(output)
  })
}
