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
exports.ReactStyleBundler = void 0;
const React = __importStar(require("react"));
const StyledComponent_1 = require("./StyledComponent");
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
            return React.createElement(StyledComponent_1.StyledComponent, Object.assign({ comp_type: "div", comp_id: className }, props));
        };
    }
    getCSSBundle() {
        return this.stylesheet;
    }
}
exports.ReactStyleBundler = new Styler();
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
