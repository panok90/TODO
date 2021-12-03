import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm.js';
import footer from './components/Footer.js';
import LoginForm from './components/Auth.js';
import Cookies from 'universal-cookie';
import {HashRouter, Route, Link} from 'react-router-dom';

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

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
    .then(response => {
      this.load_data()
    }).catch(error => console.log(error))
    }

  createProject(name, link, users) {
    const headers = this.get_headers()
    const data = {name: name, link: link, users: users}
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
        .then(response => {
          this.load_data()
        }).catch(error => console.log(error))
  }
    deleteTodo(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
    .then(response => {
      this.load_data()
    }).catch(error => console.log(error))
    }

  createTodo(projects, users, text_todo, todo_is_active) {
    const headers = this.get_headers()
    const data = {project: projects, user: users, text_todo: text_todo, todo_is_active: todo_is_active}
    console.log(data)
    axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
        .then(response => {
          this.load_data()
        }).catch(error => console.log(error))
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
                <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users}
                    createProject={(name, link, users) => this.createProject(name, link, users)}/>} />
                <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                    deleteProject={(id)=>this.deleteProject(id)} />} />
                <Route exact path='/todos/create' component={() => <TodoForm projects={this.state.projects}
                    users={this.state.users} createTodo={(projects, users, text_todo, todo_is_active) =>
                    this.createTodo(projects, users, text_todo, todo_is_active)}/>} />
                <Route exact path='/todos' component={() => <TodoList todos={this.state.todos} deleteTodo={(id)=>
                    this.deleteTodo(id)} />} />
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
