import React, { Component } from 'react';
import  NavMenu  from './header/NavMenu';
import  Footer  from './footer/Footer';
const mainC = {
    minHeight: '88vh',
}
export class Layout extends Component {
    static displayName = Layout.name;
    render () {
        return (
            <div>
                <NavMenu/>
                <div className="main-content" style={mainC}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}