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
8. Second Commit
