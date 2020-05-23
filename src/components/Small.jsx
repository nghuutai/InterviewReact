import React, { Component } from 'react'

class Small extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <small>{this.props.title}</small>
            </div>
        )
    }
}

export default Small;