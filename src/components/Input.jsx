import React, { Component } from 'react'

class Input extends Component {

    handleChange = (event) => {
        if(this.props.onChange){
            return this.props.onChange(event);
        }
    }

    handleClick = (event) => {
        if(this.props.onClick){
            return this.props.onClick(event);
        }
    }

    render() {
        return (
            <>
                <input 
                id={this.props.id}
                type={this.props.type} 
                name={this.props.name}
                className={this.props.className} 
                placeholder={this.props.placeholder}
                autoComplete={this.props.autoComplete}
                required={this.props.required ? "required" : ""}
                value={this.props.value}
                onClick={(event) => this.handleClick(event)}
                onChange={(event) => this.handleChange(event)} />
            </>
        )
    }
}

export default Input;