import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';
import { Layout } from './components/layouts/Layout';
import  Registration  from './components/Registration';
import Home from './components/Home';
import MyCourses from "./components/Mycourses";
import FAQ from "./components/FAQ";
import Library from "./components/Library";

function App() {
  return (
      <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/registration' component={Registration} />
          <Route path='/mycourses' component={MyCourses} />
          <Route path='/faq' component={FAQ} />
          <Route path='/library' component={Library} />
      </Layout>
  );
}
export default App;
