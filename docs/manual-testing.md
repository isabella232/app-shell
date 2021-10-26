# Manually testing appshell

## How to manually test your code against Publish

There may be some cases where you'll need to test your code in this repo with the use case the the user is on the Publish page. To do this follow the steps below.

### Step 1
Ensure appshell is up and running. If it is start it up by running `./dev up api-gateway login` and then `yarn watch` in the root directory of the repo. Then visit `https://appshell.local.buffer.com:3000`.

### Step 2 
Head over to the publish repo and edit the webpack config file.
There are multiple webpack configs for different environments. Go to the one which you want to test against.

```
Local:  buffer-publish/blob/main/webpack.config.dev.js
PR Branch:  buffer-publish/blob/main/webpack.config.branch.js
etc...
```

So to test locally edit this file: https://github.com/bufferapp/buffer-publish/blob/main/webpack.config.dev.js

We have to change the line which says `NAVIGATOR_URL: 'https://components.buffer.com/navigator.js',`
to now be `NAVIGATOR_URL: https://appshell.local.buffer.com:3000/main.js`.


 ### Step 3 
 Follow the guides on how to run the publish repo and your nav bar will now be rendering your local code.

