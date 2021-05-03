import React, {Component, useEffect} from 'react';
import { Route } from 'react-router';
import './App.css';
import { Layout } from './components/layouts/Layout';
import  Registration  from './components/Registration';
import Home from './components/Home';
import MyCourses from "./components/Mycourses";
import FAQ from "./components/FAQ";
import Library from "./components/Library";
import Test from './components/Test'
import axios from 'axios';
import {useDispatch} from "react-redux";
import {login} from "./features/userSlice";

function App() {
    const dispatch = useDispatch();

        const user = localStorage.getItem('user_data');
        if(user!=null){
            dispatch(login({
                user_data: user,
                loginIn:true,
            }))
        }

      return (
          <Layout>
                  <>
                  <Route exact path='/' component={Home} />
                  <Route path='/registration' component={Registration} />
                  <Route path='/mycourses' component={MyCourses} />
                  <Route path='/faq' component={FAQ} />
                  <Route path='/library' component={Library} />
                  <Route path='/test' component={Test} />
                  </>
          </Layout>
      );
}
export default App;
