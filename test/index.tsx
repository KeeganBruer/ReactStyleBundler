import React from "react";
import { ReactStyleBundler } from "../src";
import { renderToString } from 'react-dom/server';
let Wrapper = ReactStyleBundler.div`
    width: 100;
`

console.log(renderToString(<Wrapper className={"oggles"}/>))