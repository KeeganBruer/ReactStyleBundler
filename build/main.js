"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGeneratedClass = exports.ReactStyleBundler = void 0;
const React = __importStar(require("react"));
class Styler {
    constructor() {
        this.stylesheet = "";
        this.gen = mulberry32(1202);
    }
    addStyles(_css) {
        this.stylesheet += _css + "\n";
    }
    div(_css, ...args) {
        console.log(_css, args);
        let comp_id = "Gen" + uniqueID(this.gen);
        let buildCSS = "";
        for (let i = 0; i < _css.length; i++) {
            buildCSS += _css[i];
            if (i < args.length) {
                if (typeof args[i] == "function") {
                    args[i]();
                }
                buildCSS += args[i];
            }
        }
        let css = parseCSS(comp_id, buildCSS);
        this.addStyles(css);
        class BoundStyleElement extends React.Component {
            constructor(props) {
                super(props);
                this.element = new StyledComponent({
                    comp_id,
                    comp_type: "div",
                    className: props.className
                });
            }
            getClassName() {
                return `.${comp_id}`;
            }
            render() {
                return this.element.render();
            }
        }
        return BoundStyleElement;
    }
    getCSSBundle() {
        return this.stylesheet;
    }
}
exports.ReactStyleBundler = new Styler();
function useGeneratedClass(BoundStyleElement) {
    return BoundStyleElement.prototype.getClassName();
}
exports.useGeneratedClass = useGeneratedClass;
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
