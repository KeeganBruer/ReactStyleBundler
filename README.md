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


## Change Log
### 1.1.2 & 1.1.3 - Component Wrapper
- Introduces the StyledComponent, which facilitates the extention of the styled object
- Allows you to pass a className prop to the returned styled component, appending it to the generated class name

### 1.1.1 - Readme Patch
- removal of line in the Readme

### 1.1.0 - First Stable Release
- ESBuild support
- uses import structure to bundle css
- minimal css parsing. allows for styling the component, access global styles with any bracket statement, and styling sub components using "&"