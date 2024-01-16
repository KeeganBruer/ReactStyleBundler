## React Style Bundler
React Style Bundler uses the native javascript import functionality to manage the bundling of your CSS.
Javascript already handles the importing and ordering of your javascript, why not let it manage your CSS?

This package currently works best with Server Side Rendering, as it lacks functionality to bundle
## Installation

```
npm i react-style-bundler
```

## Using the Styler
```typescript
//Import the bundler instance
import {ReactStyleBundler as Styler} from "react-style-bundler"

//Create a styled component
const Wrapper = Styler.div`
    height: 200px;
    width: 200px;

    &:hover {
        color: red;
    }

    & > span {
        width: 50%;
    }
`

//Use the styled component
function Component(props:{}) {
    return (
        <Wrapper>
            <span>Hi</span>
        </Wrapper>
    )
}
```

## Setup

### Independant Bundling
```typescript
// import the bundler instance
import {ReactStyleBundler} from "react-style-bundler"
// import your main react component so the javascript runtime can do it's thing
import { App } from "/app"
// after having javascript go through your react app, get the CSS bundle as a string
let bundle = ReactStyleBundler.getCSSBundle()
// save the string to a file
await saveFile(bundle, "./build/out.css")
```


### ESBuild Setup

In your esbuild script.
```typescript
//Import the bundler instance
import {ReactStyleBundler} from "react-style-bundler"
import { App } from "/app"

function build() {
    //Build your client-side bundle
    await esbuild.build({
        ...
    })

    //Retreive and save the created bundle
    let bundle = ReactStyleBundler.getCSSBundle()
    await saveFile(bundle, "./build/out.css")
}
```
If the CSS is bundled by the javascript import functionality, why do we need to bundle after building with esbuild?

We don't! The only thing that matters is that your app is imported before calling getCSSBundle()

```typescript
import {ReactStyleBundler} from "react-style-bundler"
import { App } from "/app"
let bundle = ReactStyleBundler.getCSSBundle()
await saveFile(bundle, "./build/out.css")

function build() {
    await esbuild.build({
        ...
    })    
}
```

### Advanced Usage
#### Server Side Rendering
Lets see the basic way to bundle the css during build.

```typescript
import {ReactStyleBundler} from "react-style-bundler"
import { App } from "/app"
let bundle = ReactStyleBundler.getCSSBundle()
await saveFile(bundle, "./build/out.css")
```
The important part to see is that the styling functionality comes from importing your App component.
Your App component needs to be the merge point for your client/server functionality. By using the import ordering of the app component, you can match the class name generation order between the client/server.

<h3 style="color:yellow;">WARNING</h3>
Be carful when adding styles to the client side bundle higher than the shared App component as it will not be imported on the server, causing it to be lacking from the bundle.

## Change Log
### 1.1.6 - Readme Improvements
- Adds the useGeneratedClass utility to retreieve the generated classname from the bound style component

### 1.1.5 - Readme Improvements
- Adds SSR explanation and example

### 1.1.4 - Combine to one file until I set up client side bundler
- tsc won't natively bundle files for client, need to set up a bundler

### 1.1.2 & 1.1.3 - Component Wrapper
- Introduces the StyledComponent, which facilitates the extention of the styled object
- Allows you to pass a className prop to the returned styled component, appending it to the generated class name

### 1.1.1 - Readme Patch
- removal of line in the Readme

### 1.1.0 - First Stable Release
- ESBuild support
- uses import structure to bundle css
- minimal css parsing. allows for styling the component, access global styles with any bracket statement, and styling sub components using "&"