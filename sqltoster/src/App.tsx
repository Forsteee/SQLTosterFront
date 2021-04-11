import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';
import { Layout } from './components/layoutforpages/Layout';
import  Registration  from './components/Registration';
import Home from './components/Home';

function App() {
  return (
      <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/registration' component={Registration} />
      </Layout>
  );
}
export default App;
