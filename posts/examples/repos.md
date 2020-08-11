---
tags:
  - dev-post
layout: post
pagination:
    data: repos
    size: 1
    alias: repo
    addAllPagesToCollections: true
eleventyComputed:
    title: "{{ repo.title }}"
---

<p>{{ repo.gh_url  }}</p>
<p>{{ repo.readme_html  }}</p>

