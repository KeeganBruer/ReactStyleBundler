import * as React from "react";

class Styler {
    stylesheet:string;
    gen:()=>number
    constructor() {
        this.stylesheet = "";
        this.gen = mulberry32(1202)
    }
    addStyles(_css:string) {
        this.stylesheet += _css + "\n"
    }
    div(_css:TemplateStringsArray, ...args: any[]) {
        console.log(_css, args)
        let comp_id = "Gen"+uniqueID(this.gen)
        let buildCSS = "";
        for (let i = 0; i < _css.length; i++) {
            buildCSS += _css[i]
            if (i < args.length) {
                if (typeof args[i] == "function") {
                    args[i]()
                }
                buildCSS += args[i]
            }
        }
        let css = parseCSS(comp_id, buildCSS);
        this.addStyles(css)
        class BoundStyleElement extends React.Component<any> {
            element:StyledComponent
            constructor(props:{className?:string}) {
                super(props);
                this.element = new StyledComponent({
                    ...props,
                    comp_id,
                    comp_type:"div"
                })
            }
            getClassName() {
                return `.${comp_id}`
            }
            render(): React.ReactNode {
                return this.element.render()
            }
        }
        return BoundStyleElement
    }
    getCSSBundle() {
        return this.stylesheet;
    }
}
export const ReactStyleBundler = new Styler();
export function useGeneratedClass(BoundStyleElement:{prototype:{getClassName:Function}}) {
    return BoundStyleElement.prototype.getClassName();
}
function uniqueID(rand:()=>number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
        result += characters.charAt(Math.floor(rand() * charactersLength));
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

function mulberry32(a:number) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}



/**
 * 
 */
type Props = {
    comp_type:string, 
    comp_id:string, 
    className?:string
}
class StyledComponent extends React.Component<Props> {
    comp_type:string
    comp_id:string
    constructor(props:{comp_type:string, comp_id:string, className?:string}) {
        super(props)
        this.comp_type = props.comp_type
        this.comp_id = props.comp_id
    }
    render(): React.ReactNode {
        let classNames = [
            this.comp_id
        ]
        if (this.props.className != undefined) classNames.push(...this.props.className.split(" "))
        let newProps:Partial<Props> = {
            ...this.props,
            className:classNames.join(" ")
        }
        delete newProps["comp_type"];
        delete newProps["comp_id"];

        return React.createElement(this.comp_type, newProps)
    }
}