## React Style Bundler

## Installation

```
npm i react-style-bundler
```

## Setup

### ESBuild Setup

In your esbuild script.
```typescript
//Import the bundler instance
import {ReactStyleBundler} from "react-style-bundler"

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

## Using the Styler
```typescript
//Import the bundler instance
import {ReactStyleBundler as Styler} from "react-style-bundler"

//Create a styled component
const Wrapper = Styler.div`
    height: 200px;
    &:hover {
        color: red;
    }
`

//Use the styled component
function Component(props:{}) {
    return (
        <Wrapper>
            Hi
        </Wrapper>
    )
}
```