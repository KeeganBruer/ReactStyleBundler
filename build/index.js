import * as React from "react";
class Styler {
    constructor() {
        this.stylesheet = "";
        this.gen = mulberry32(1202);
    }
    addStyles(_css) {
        this.stylesheet += _css + "\n";
    }
    div(_css) {
        let className = "Gen" + uniqueID(this.gen);
        let css = parseCSS(className, _css.join(""));
        this.addStyles(css);
        return (props) => {
            return React.createElement(StyledComponent, Object.assign({ comp_type: "div", comp_id: className }, props));
        };
    }
    getCSSBundle() {
        return this.stylesheet;
    }
}
export const ReactStyleBundler = new Styler();
function uniqueID(rand) {
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
function parseCSS(className, _css) {
    let bracketedLines = [];
    let nonBracketed = [];
    let lines = _css.split("\n");
    let inBrackets = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("{")) {
            inBrackets = true;
        }
        if (inBrackets) {
            bracketedLines.push(lines[i].trim());
        }
        else {
            nonBracketed.push(lines[i].trim());
        }
        if (lines[i].includes("}")) {
            inBrackets = false;
        }
    }
    //filter empty lines
    nonBracketed = nonBracketed.filter(l => l.trim() != "");
    bracketedLines = bracketedLines.filter(l => l.trim() != "");
    let css = `.${className} {\n\t${nonBracketed.join("\n")}\n}\n`;
    if (bracketedLines.length) {
        bracketedLines = bracketedLines.map(l => {
            if (l.includes("{") || l.includes("}"))
                return l;
            return "\t" + l;
        });
        let globalizedStyles = bracketedLines.join("\n");
        globalizedStyles = globalizedStyles.split("&").join(`.${className}`);
        css += globalizedStyles + "\n";
    }
    return css;
}
function mulberry32(a) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
class StyledComponent extends React.Component {
    constructor(props) {
        super(props);
        this.comp_type = props.comp_type;
        this.comp_id = props.comp_id;
    }
    render() {
        let classNames = [
            this.comp_id
        ];
        if (this.props.className != undefined)
            classNames.push(...this.props.className.split(" "));
        let newProps = Object.assign(Object.assign({}, this.props), { className: classNames.join(" ") });
        delete newProps["comp_type"];
        delete newProps["comp_id"];
        return React.createElement(this.comp_type, newProps);
    }
}
