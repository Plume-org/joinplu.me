# JoinPlu.me

A website to explain what Plume is, and to guide newcomers and people who would
like to contribute.

It is using middleman.

## Prerequisites

### Crowdin

- `crowdin` command v3
- Environment variable `CROWDIN_PERSONAL_TOKEN` (API token for Crowdin API v3)

### Netlify

- `netlify` command v2
- Environment variable `NETLIFY_AUTH_TOKEN`

## Usefull commands

- `middleman` for live preview during development
- `bundle exec rake build_site` when deploying
- `bundle exec rake deploy_trans` when deploying https://translate.joinplu.me/
