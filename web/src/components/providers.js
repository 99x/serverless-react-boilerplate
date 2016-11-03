import React from 'react';
import ItemListHeader from './item-list-header';

export default class Providers extends React.Component {
    render(){
        return (
            <div className="providers">
                <button id="facebook" onClick={this.onLoginClick.bind(this)}><div className="logo"></div><div className="text">Log In</div></button>
                <button id="google" onClick={this.onLoginClick.bind(this)}><div className="logo"></div><div className="text">Sign In</div></button>
                <button id="microsoft" onClick={this.onLoginClick.bind(this)}><div className="logo"></div><div className="text">Log In</div></button>
                <button id="custom-google" onClick={this.onLoginClick.bind(this)}>custom-google</button>
            </div>
        );
    }

    onLoginClick(e){
        e.preventDefault();
        this.props.login({'provider': e.target.id});
    }
}
