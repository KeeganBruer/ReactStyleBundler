import React from "react"

class Styler {
    stylesheet:string;
    constructor() {
        this.stylesheet = "";
    }
    addStyles(_css:string) {
        this.stylesheet += _css + "\n"
    }
    div(_css:TemplateStringsArray) {
        let className = uniqueID()
        let css = parseCSS(className, _css.join(""));
        this.addStyles(css)
        return (props:any)=>{
            return <div {...props} className={className}/>
        }
    }
    getCSSBundle() {
        return this.stylesheet;
    }
}
export const ReactStyleBundler = new Styler();

function uniqueID() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function parseCSS(className:string, _css:string) {
    let bracketedLines = [];
    let nonBracketed = [];
    let lines = _css.split("\n");
    let inBrackets = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("{")) {
            inBrackets = true;
        }
        
        if (inBrackets) {
            bracketedLines.push(lines[i].trim())
        } else {
            nonBracketed.push(lines[i].trim())
        }

        if (lines[i].includes("}")) {
            inBrackets = false;
        }
    }
    //filter empty lines
    nonBracketed = nonBracketed.filter(l=>l.trim() != "")
    bracketedLines = bracketedLines.filter(l=>l.trim() != "")

    let css = `.${className} {\n\t${nonBracketed.join("\n")}\n}\n`
    
    if (bracketedLines.length) {
        bracketedLines = bracketedLines.map(l=>{
            if (l.includes("{") || l.includes("}")) return l;
            return "\t"+l
        })
        let globalizedStyles = bracketedLines.join("\n");
        globalizedStyles = globalizedStyles.split("&").join(`.${className}`)
        css += globalizedStyles+"\n"
    }
    return css;
}


ReactStyleBundler.div`
    width: 200px;
    &:hover {
        height: 300px;
    }
`
ReactStyleBundler.div`
    height: 200px;
    &:hover {
        color: red;
    }
`

console.log(ReactStyleBundler.getCSSBundle())