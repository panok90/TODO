import React from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import MenuList from './components/Menu.js';
import footer from './components/Footer.js';

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': []
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
   }
   render () {
       return (
       <div className="wrapper">
            <nav className="navStyle">
                <MenuList/>
            </nav>
            <div className="mainContent">
                <UserList users={this.state.users} />
            </div>
            <footer className="footerStyle" />
       </div>
       )
   }
}

export default App;
