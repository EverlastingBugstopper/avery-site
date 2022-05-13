# lighthouse

This directory contains the lighthouse badges and the code used to generate them.

Currently I can't use the official lighthouse CLI because it doesn't work on my machine, so I'm using a GitHub Action to file PRs for me instead.

`utils.js` includes a small error reporter, some console helpers, and a way to set key value pairs in GitHub actions.

`scores.js` has a `validate` function and an `update` function which operates on `./scores.json`.

`generate.js` generates badges from a `scores.json` file. A perfect `scores.json` looks like this:

```json
{
  "data": {
    "accessibility": 100,
    "best_practices": 100,
    "performance": 100,
    "seo": 100
  }
}
```
