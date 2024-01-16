import * as React from "react";

type Props = {
    comp_type:string, 
    comp_id:string, 
    className?:string
}
export class StyledComponent extends React.Component<Props> {
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