Storybook

PreReq
npx playwright install 

Tests - only storybook

Structure
Atomic Design

Build Setup 
Names in vite.config.ts

Build Rules
Any file with same name as its parent *.vue in atoms/molecules/organisms

Importing components

Publish logic
- .github/workflows/release.yml — triggers on push to release      
  branch, runs the script, builds, commits with [skip ci] to avoid   
  re-triggering, tags, publishes to npm, creates a GitHub Release    

  Two things to set up before it works:
  1. NPM_TOKEN — add your npm publish token in GitHub repo Settings →
   Secrets
  2. private: true in package.json — remove it or npm publish will   
  refuse