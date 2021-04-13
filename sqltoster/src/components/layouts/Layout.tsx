import React, { Component } from 'react';
import  NavMenu  from './Header';
import  Footer  from './Footer';
const mainC = {
    minHeight: '100vh',
}
const root = {

}
export class Layout extends Component {
    static displayName = Layout.name;
    render () {
        return (
            <div style={root}>
                <NavMenu/>
                <div className="main-content" style={mainC}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}