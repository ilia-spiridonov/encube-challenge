# README.md

Deployed version: https://encube-challenge.fly.dev/

How to run locally:

```sh
nvm install # Or make sure you have node v24 if you don't have NVM
corepack enable
corepack install
pnpm install --frozen-lockfile
pnpm run verify # Should exit with 0
pnpm run start
open http://localhost:5173/
```

See `DECISIONS.md` and `CLAUDE.md` for info on the project.
