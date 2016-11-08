import React from 'react';

export default class Logout extends React.Component {
    render() {
        return (
            <div className="logout">
                <button id="logout" onClick={this.onLogoutClick.bind(this)}>Logout</button>
            </div>
        );
    }

    onLogoutClick(e){
        e.preventDefault();
        this.props.logout();
    }
}
