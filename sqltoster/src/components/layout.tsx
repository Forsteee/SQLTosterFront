import React, { Component } from 'react';
import  NavMenu  from './header/NavMenu';
import  Footer  from './footer/Footer';
//import './Layout.css'

export class Layout extends Component {
    static displayName = Layout.name;

    render () {
        return (
            <div>
                <NavMenu />
                <div className="main-content">
                    dfsdfsdf
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}