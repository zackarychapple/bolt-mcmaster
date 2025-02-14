# Introduction
This repository is a test of going from a stock project to a full CI/CD setup with Zephyr publishing to environments with e2e test suites.

# Replication Steps
## Generation
1. Using [Bolt](https://bolt.new/) generated a clone of [McMaster](https://www.mcmaster.com/)
2. Downloaded the Zip from Bolt

## Modifications
1. Created a public directory at the root
2. Added git remote
3. Created initial commit
4. Did initial push 
5. Add Zephyr Package with `npm install vite-plugin-zephyr@latest --save`
6. Add Zephyr plugin to vite config with Zephyr doc [instructions](https://docs.zephyr-cloud.io/recipes/react-vite) 
7. Did first Zephyr build
```bash
zackarychapple@MacBook-Pro-2 bolt mcmaster-carr % npm run build

> vite-react-typescript-starter@0.0.0 build
> vite build

The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.
vite v5.4.8 building for production...
 ZEPHYR   Opening browser for authentication...
✓ 1470 modules transformed.
 ZEPHYR   Hi zackary_chapple!
 ZEPHYR   vite-react-typescript-starter.bolt-mcmaster.zackarychapple#260
 ZEPHYR   
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-Br_qNsvR.css    9.64 kB │ gzip:  2.38 kB
dist/assets/index-CsfIn8QN.js   148.03 kB │ gzip: 47.61 kB
✓ built in 5.49s
 ZEPHYR   Uploaded ci snapshot in 223ms
 ZEPHYR   (3/3 assets uploaded in 316ms, 154.43kb)
 ZEPHYR   Deployed to Zephyr's edge in 429ms.
 ZEPHYR   
 ZEPHYR   https://zackary-chapple-260-vite-react-typescript-starter-a974ca86e-ze.zephyrcloud.app
```
8. Commit
9. Generated a GitHub action for pull requests using ChatGPT 03-mini-high with `i need a github action that when I open a pull request does a npm build` as the prompt.
10. Commit 
11. Cleaned yml
12. Commit
13. Switched to development branch
14. Commit
15. Created [first](https://github.com/zackarychapple/bolt-mcmaster/pull/1) pull request to see if GitHub action ran and the output.
16. Build hung trying to open window to authenticate Zephyr, cancelled the workflow
```bash
Run npm run build
> vite-react-typescript-starter@0.0.0 build
> vite build
The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.
vite v5.4.8 building for production...
 ZEPHYR   Opening browser for authentication...
Error: The operation was canceled.
0s
0s
Post job cleanup.
/usr/bin/git version
git version 2.48.1
Temporarily overriding HOME='/home/runner/work/_temp/124609fb-a5d4-4059-8179-1d6856436952' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
/usr/bin/git config --global --add safe.directory /home/runner/work/bolt-mcmaster/bolt-mcmaster
/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
 ```
17. Using the [token generation page](https://app.zephyr-cloud.io/profile/settings/user-tokens/generate) on Zephyr created an api token to use with GitHub
18. Looked up undocumented functionality on how to add Zephyr to GitHub action
```yml
env:
  ZE_SECRET_TOKEN: ${{ zephyr_auth_token }}
```
19. Added the secret to [Actions Secrets ](https://github.com/zackarychapple/bolt-mcmaster/settings/secrets/actions/new)
20. Commit & Push to development
21. Forgot to hit save on the secret
22. Reran the job
23. Secret on GitHub was upper case and yml was lower case, correcting and pushing again
24. Asked ChatGPT why it was still failing. Turns out I need to use `secrets.`, correcting and pushing again
25. Got a new error because there was not a file in public so it was never pushed to GitHub.
```bash
Run npm run build

> vite-react-typescript-starter@0.0.0 build
> vite build

The CJS build of Vite's Node API is deprecated. See https://vitejs.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.
vite v5.4.8 building for production...
transforming...
 ZEPHYR   Hi zackary_chapple!
 ZEPHYR   vite-react-typescript-starter.bolt-mcmaster.zackarychapple#261
 ZEPHYR   
✓ 1470 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-DTFPGNkD.css    8.44 kB │ gzip:  2.36 kB
dist/assets/index-DFboT6Ye.js   148.03 kB │ gzip: 47.61 kB
✓ built in 2.32s
error during build:
Error: ENOENT: no such file or directory, scandir '/home/runner/work/bolt-mcmaster/bolt-mcmaster/public'
    at readdirSync (node:fs:1506:26)
    at loadDir (/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/vite-plugin-zephyr/dist/lib/internal/extract/load_public_dir.js:12:54)
    at load_public_dir (/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/vite-plugin-zephyr/dist/lib/internal/extract/load_public_dir.js:34:11)
    at loadStaticAssets (/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/vite-plugin-zephyr/dist/lib/internal/extract/load_static_assets.js:9:76)
    at extract_vite_assets_map (/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/vite-plugin-zephyr/dist/lib/internal/extract/extract_vite_assets_map.js:8:68)
    at Object.closeBundle (/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/vite-plugin-zephyr/dist/lib/vite-plugin-zephyr.js:55:91)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async Promise.all (index 0)
    at async PluginDriver.hookParallel (file:///home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/rollup/dist/es/shared/node-entry.js:20658:9)
    at async Object.close (file:///home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/rollup/dist/es/shared/node-entry.js:21627:13)
Error: Process completed with exit code 1.
```
26. Added `.gitkeep` file in the public directory so it pushes. 
27. Commit & Push to development
