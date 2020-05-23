import React, { Component } from 'react'

class Notification extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <span className="closebtn" onClick={() => this.props.onClick()}>&times;</span>
                {this.props.title}
            </div>
        )
    }
}

export default Notification;
