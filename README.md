# @bufferapp/app-shell

Buffer's shared App Shell for our front-end applications. 🚀

## Installation

```bash
npm install @bufferapp/app-shell
```


## Usage

🚩 **You should be able to drop this component into your apps, replacing the old AppShell.**

```jsx
// ❌ Change this
import AppShell from '@bufferapp/ui/AppShell';

// ✅ To this
import AppShell from '@bufferapp/app-shell';
```

There are no API or breaking changes.

For now, refer to [the old documentation for `@bufferapp/ui/AppShell`](https://bufferapp.github.io/ui/#/ui/ui/appshell) until we migrate docs here.


## Contributing

* Clone this repo and make your changes.

```
git clone git@github.com:bufferapp/app-shell.git
```

* Ensure your editor is setup for ESLint and Prettier.
* Make and test your changes locally using `npm link` or `yarn link`.
* Make a pull request and have it reviewed and merged into `main`.
* Now, from the `main` branch:
  * `git pull`
  * `npm run build` 
  * Update [CHANGELOG.md](/CHANGELOG.md)
  * `npm version [patch|minor|major]` - pick one depending on type of changes
  * `git push origin main` - push changes to GitHub
  * `npm run publish` - publish the new version to NPM