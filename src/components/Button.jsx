import React, { Component } from 'react'

export default class Button extends Component {

    handleClick = () => {
        if(this.props.onClick){
            return this.props.onClick();
        }
    }

    render() {
        return (
            <>
                <button className={this.props.className} onClick={this.handleClick()}>{this.props.value}</button> 
            </>
        )
    }
}
