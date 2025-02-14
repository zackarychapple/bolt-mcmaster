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
28. Built passed and [URL](https://zackary-chapple-262-vite-react-typescript-starter-8ab89d15b-ze.zephyrcloud.app) was generated
29. Asking chat GPT how to get the URL from the build output `If my build step has output that contains the below text.  How would I get the URL that is output and pass it to another step? `
30. Commit & Push to development to check output
31. Adjusting the formatting of the yml to correct for error
32. Adding missing echo to GitHub output
33. Commit & Push to development to check output
34. Asked ChatGPT why it still wasn't working. It said I was missing the ID in the build step that was the source of the output. 
35. Commit & Push to development to check output
36. Output works as expected, adding Midscene and Puppeteer `npm install @midscene/web puppeteer tsx --save-dev` with instructions from their [doc site](https://midscenejs.com/integrate-with-puppeteer.html)
37. Copy pasted their example test to an `ai-e2e` directory.
38. Adding script to package.json for running the test.
39. Commit & Push to development to check output
40. Got an error
```bash
Run npm run ai-e2e
  
> vite-react-typescript-starter@0.0.0 ai-e2e
> npx tsx ./ai-e2e/test.ts
/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/@puppeteer/browsers/src/launch.ts:490
          new Error(
          ^
Error: Failed to launch the browser process!
[2137:2137:0214/011246.360352:FATAL:zygote_host_impl_linux.cc(127)] No usable sandbox! If you are running on Ubuntu 23.10+ or another Linux distro that has disabled unprivileged user namespaces with AppArmor, see https://chromium.googlesource.com/chromium/src/+/main/docs/security/apparmor-userns-restrictions.md. Otherwise see https://chromium.googlesource.com/chromium/src/+/main/docs/linux/suid_sandbox_development.md for more information on developing with the (older) SUID sandbox. If you want to live dangerously and need an immediate workaround, you can try using --no-sandbox.
[0214/011246.377490:ERROR:file_io_posix.cc(145)] open /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq: No such file or directory (2)
[0214/011246.377538:ERROR:file_io_posix.cc(145)] open /sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq: No such file or directory (2)
TROUBLESHOOTING: https://pptr.dev/troubleshooting
    at ChildProcess.onClose (/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/@puppeteer/browsers/src/launch.ts:490:11)
    at ChildProcess.emit (node:events:530:35)
    at ChildProcess._handle.onexit (node:internal/child_process:293:12)
Node.js v20.18.2
Error: Process completed with exit code 1.
```
41. Trying to run locally
42. Found there is also going to be an error for the Midscene API
```bash
Midscene - report file updated: /Users/zackarychapple/code/bolt mcmaster-carr/midscene_run/report/web-2025-02-13_20-18-17-472.html
/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/web/dist/es/puppeteer.js:4496
      throw new Error(`${errorTask == null ? void 0 : errorTask.error}
            ^

Error: Cannot find config for AI model service. You should set it before using. https://midscenejs.com/model-provider.html
AssertionError [ERR_ASSERTION]: Cannot find config for AI model service. You should set it before using. https://midscenejs.com/model-provider.html
    at callAiFn (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/core/src/ai-model/common.ts:26:3)
    at AiExtractElementInfo (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/core/src/ai-model/inspect.ts:262:24)
    at Insight.extract (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/core/src/insight/index.ts:190:42)
    at async Object.executor (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/web/dist/es/puppeteer.js:4085:22)
    at async Object.executor (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/web/dist/es/puppeteer.js:3430:24)
    at Executor.flush (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/core/src/ai-model/action-executor.ts:126:25)
    at async PageTaskExecutor.query (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/web/dist/es/puppeteer.js:4093:20)
    at async PuppeteerAgent.aiQuery (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/web/dist/es/puppeteer.js:4489:34)
    at <anonymous> (/Users/zackarychapple/code/bolt mcmaster-carr/ai-e2e/test.ts:25:19)
    at PuppeteerAgent.aiQuery (/Users/zackarychapple/code/bolt mcmaster-carr/node_modules/@midscene/web/dist/es/puppeteer.js:4496:13)
    at <anonymous> (/Users/zackarychapple/code/bolt mcmaster-carr/ai-e2e/test.ts:25:19)
```
43. Adding OpenAI token to Github secrets `OPENAI_API_KEY`
44. Using the output to the previous error on the action added the following to the Puppeteer launch script. `args: ['--no-sandbox', '--disable-setuid-sandbox'],`
45. Commit & Push to development to check output
46. Got a different error
```bash
Run npm run ai-e2e
  
> vite-react-typescript-starter@0.0.0 ai-e2e
> npx tsx ./ai-e2e/test.ts
/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/@puppeteer/browsers/src/launch.ts:490
          new Error(
          ^
Error: Failed to launch the browser process! undefined
[2069:2069:0214/012326.595509:ERROR:ozone_platform_x11.cc(245)] Missing X server or $DISPLAY
[2069:2069:0214/012326.595548:ERROR:env.cc(257)] The platform failed to initialize.  Exiting.
TROUBLESHOOTING: https://pptr.dev/troubleshooting
    at ChildProcess.onClose (/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/@puppeteer/browsers/src/launch.ts:490:11)
    at ChildProcess.emit (node:events:530:35)
    at ChildProcess._handle.onexit (node:internal/child_process:293:12)
Node.js v20.18.2
Error: Process completed with exit code 1.
```
47. Found a [StackOverflow post](https://stackoverflow.com/questions/62228154/puppeteer-fails-to-initiate-in-github-actions) that talked about the error, updated libgm1 per the answer.
48. Commit & Push to development to check output 
49. Looking at headless [documents](https://pptr.dev/guides/headless-modes) for Puppeteer found out about headless shell mode trying that
50. Commit & Push to development to check output
51. Now I got the error for AI Model service missing api key, adding secret to env vars in action 
52. Commit & Push to development to check output
53. Run was successful, attempting to upload the output html with upload-artifact GitHub functionality
54. Commit & Push to development to check output
55. Output was successfully uploaded and validated. 
56. Commit & Push to development to check output 
57. Attempting to turn the test assertion red by validating an incorrect phone number
58. Commit & Push to development to check output 
59. Test failed as expected
```bash
Run npm run ai-e2e
  
> vite-react-typescript-starter@0.0.0 ai-e2e
> npx tsx ./ai-e2e/test.ts
url:https://zackary-chapple-273-vite-react-typescript-starter-4de241851-ze.zephyrcloud.app
Midscene - report file updated: /home/runner/work/bolt-mcmaster/bolt-mcmaster/midscene_run/report/web-2025-02-14_02-04-08-552.html
/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/@midscene/web/dist/es/puppeteer.js:4514
      throw new Error(`${errMsg}
            ^
Error: Assertion failed: The phone number is '(404) 346-8000'
Reason: The phone number displayed on the page is '(404) 346-7000', not '(404) 346-8000'.
    at PuppeteerAgent.aiAssert (/home/runner/work/bolt-mcmaster/bolt-mcmaster/node_modules/@midscene/web/dist/es/puppeteer.js:4514:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async <anonymous> (/home/runner/work/bolt-mcmaster/bolt-mcmaster/ai-e2e/test.ts:26:5)
Node.js v20.18.2
Error: Process completed with exit code 1.
```
59. Turning test green again and cleaning up apt-get install (may not be needed)
60. Commit & Push to development to check output
61. Tests were green and apt-get install was not needed
62. Trying to set headless to `true` to test "new headless" mode
63. Commit & Push to development to check output
64. Broke yml actually cleaning up apt-get install
65. Commit & Push to development to check output
66. Fixing yml
67. Commit & Push to development to check output
68. Back to green, trying to load Chrome extension
69. Copy pasted the remote from the [vite mf](https://github.com/ZephyrCloudIO/zephyr-examples/tree/main/examples/react-vite-mf) zephyr examples as the `example-remote`
70. Removed the code for chrome extension since we don't actually need it to test Zephyr
71. Adding federation to host config
72. Making mfConfig of host match package.json name
