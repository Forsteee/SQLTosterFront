import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';
import { Layout } from './components/layoutforpages/Layout';
import  Registration  from './components/Registration';
import Home from './components/Home';
import MyCourses from "./components/Mycourses";

function App() {
  return (
      <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/registration' component={Registration} />
          <Route path='/mycourses' component={MyCourses} />
      </Layout>
  );
}
export default App;
