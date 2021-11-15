import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import MenuList from './components/Menu.js';
import footer from './components/Footer.js';
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'utodos': []
       }
          }
   componentDidMount() {
       axios.get('http://127.0.0.1:8000/api/users/')
       .then(respose =>{
        const users = respose.data

       this.setState(
           {
               'users': users
           }
           )
       }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
       .then(respose =>{
        const projects = respose.data

       this.setState(
           {
               'projects': projects
           }
           )
       }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/')
       .then(respose =>{
        const todos = respose.data

       this.setState(
           {
               'todos': todos
           }
           )
       }).catch(error => console.log(error))
   }
   render () {
       return (
       <div className="wrapper">
       <HashRouter>
            <MenuList />
            <div className="mainContent">
                <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />} />
            </div>
            <footer className="footerStyle" />
       </HashRouter>
       </div>
       )
   }
}

export default App;
