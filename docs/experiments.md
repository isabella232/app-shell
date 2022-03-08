# Creating experiments

Currently how we are able to run an AB experiment in appshell is by using the package called `Albert` from the marketing repo. 

At this stage we have done a copy paste of it's code into our repo. You can find the code in `packages/albert/index.js`

For a more detailed description of the library checkout marketings documentation: https://github.com/bufferapp/buffer-marketing/blob/master/docs/Creating-Experiments.md


## How to create a new AB experiment

### Step 1

The first thing you need to do is define a new experiment with its distributions and weights.
Go to `packages/albert/index.js`
Inside the experiments const add your own key and value. Similar to this code:

```js
export const experiments = {
    NEW_KEY_NAME: {
        name: 'THIS_WILL_BE_THE_TRACKING_ID',
        distribution: {
            variant_1: 50,
        },
    },
};
```

## Step 2
Use the variant in your component.

```js
import { useAlbert } from 'albert';

function MyNewExperiment() {
    const variant = useAlbert('NEW_KEY_NAME');
    return (
        <div>
            {variant === 'variant_1' ? (
                <h1>Im seeing the variant one content!</h1>
                ) : <h1>Im seeing the controled group content!</h1>

            }
        </div>
    )
}
```
## Limitations

Currently you can only have one experiment running on each page. 

The reason being, the React hook (useAlbert) is doing some cookie reading/mutating and so if you call the hook twice at nearly the same time you'll run into a race condition and the cookie isn't set correctly.

This also may not be a limitation as having more than one experiment running on a page could pollute the data being collected. So consider this is more of a best practice which we at Buffer have been doing for a while, keeping to having one experiment running per page.

## Notes
For more information checkout the marketing documentation. https://github.com/bufferapp/buffer-marketing/blob/master/docs/Creating-Experiments.md

In the future if we decide AB experiments are something we wil use frequently we should look into turning the `albert` code into a standalone package.


