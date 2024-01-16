import React from "react";
import { ReactStyleBundler, useGeneratedClass } from "../src";
import { renderToString } from 'react-dom/server';
let Wrapper = ReactStyleBundler.div`
    width: 100;
    ${10}
`
let WrapperClass = useGeneratedClass(Wrapper)
console.log(WrapperClass)
console.log(renderToString(<Wrapper className={"oggles"}/>))
console.log(ReactStyleBundler.getCSSBundle())