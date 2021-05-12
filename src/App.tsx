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
import {useDispatch, useSelector} from "react-redux";
import {login, selectUser} from "./features/userSlice";
import Editing from "./components/Editing";

function App() {
    const dispatch = useDispatch();

    const userId = localStorage.getItem('user_id');
    if (userId != null) {
        dispatch(login({
            user_id: userId,
            loginIn: true,
        }))
    }
    return (
        <Layout>
            <>
                <Route exact path='/' component={Home}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/mycourses' component={MyCourses}/>
                <Route path='/faq' component={FAQ}/>
                <Route path='/library' component={Library}/>
                <Route path='/test' component={Test}/>
                <Route path='/editing' component={Editing}/>
            </>
        </Layout>
    );
}
export default App;
