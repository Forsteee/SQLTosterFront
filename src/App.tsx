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
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import Editing from "./components/Editing";
import axios from "axios";
import Course from "./components/Course";
import CreateTest from "./components/CreateTest";
import CreateTask from "./components/CreateTask";

function App() {
    const dispatch = useDispatch();

    const userId = localStorage.getItem('user_id');
    const user_token = localStorage.getItem('user_token')

    if (user_token != null) {

        const config = {
            headers: { Authorization: `Bearer ${user_token}` },
        };
        const bodyParameters = {
            user_id: userId,
        };
        const req = async () => await axios.post('http://localhost:3001/users/checkToken',
            bodyParameters,
            config
            )
            .then(function (response){
            dispatch(login({
                user_id: userId,
                loginIn: true,
            }))
            }).catch(function (error){
            dispatch(logout());
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_id');
            console.log(error);
            })
        req();
    }
    return (
        <Layout>
            <>
                <Route exact path='/' component={Home}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/mycourses' component={MyCourses}/>
                <Route path='/faq' component={FAQ}/>
                <Route path='/library' component={Library}/>
                <Route path='/test/:testId' component={Test}/>
                <Route path='/editing' component={Editing}/>
                <Route path='/course' component={Course}/>
                <Route path='/createTest' component={CreateTest}/>
                <Route path='/createTask' component={CreateTask}/>
            </>
        </Layout>
    );
}
export default App;
