import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';
import { Layout } from './components/layoutforpages/Layout';
import  Registration  from './components/Registration';

function App() {
  return (
      <Layout>
        {/*  <Route path='/registration' component={Registration} />*/}
      </Layout>
  );
}

export default App;
