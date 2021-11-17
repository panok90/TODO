import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import footer from './components/Footer.js';
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'todos': [],
           'token': ''
       }
          }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }

  is_authenticated() {
    return !! this.state.token
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
        this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
  if (this.is_authenticated())
    {
        headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }


   load_data(){

    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', {headers})
    .then(respose =>{
    const users = respose.data

    this.setState(
       {
           'users': users
       }
       )
    }).catch(error => {
          console.log(error)
          this.setState({users: []})
        })

    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
    .then(respose =>{
    const projects = respose.data

    this.setState(
       {
           'projects': projects
       }
       )
    }).catch(error => {
          console.log(error)
          this.setState({projects: []})
        })

    axios.get('http://127.0.0.1:8000/api/todos/', {headers})
    .then(respose =>{
    const todos = respose.data

    this.setState(
       {
           'todos': todos
       }
       )
    }).catch(error => {
          console.log(error)
          this.setState({todos: []})
        })
    }

  componentDidMount() {
    this.get_token_from_storage()
  }

   render () {
       return (
       <div className="wrapper">
       <HashRouter>
            <nav className="navStyle">
                <ul className="ulMenuStyle">
                    <li className="liMenuStyle"><Link className="LinkMenuStyle" to='/'>
                        Список пользователей</Link></li>
                    <li className="liMenuStyle"><Link className="LinkMenuStyle" to='/projects'>
                        Список пректов</Link></li>
                    <li className="liMenuStyle"><Link className="LinkMenuStyle" to='/todos'>
                        Список TODO</Link></li>
                    <li className="liMenuStyle">{this.is_authenticated() ?
                        <button onClick={()=>this.logout()}>Logout</button>
                        : <Link className="LinkMenuStyle" to='/login'>Login</Link>}</li>
                </ul>
            </nav>
            <div className="mainContent">
                <Route exact path='/' component={() => <UserList users={this.state.users} />} />
                <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} />} />
                <Route exact path='/login' component={() =>
                    <LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />
            </div>
            <footer className="footerStyle" />
       </HashRouter>
       </div>
       )
   }
}

export default App;
