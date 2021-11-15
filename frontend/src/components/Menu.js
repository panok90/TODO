import React from 'react'
import {Link} from 'react-router-dom'

let menus = [
    ['Список пользователей', '/'],
    ['Список пректов', '/projects'],
    ['Список TODO', '/todos']
];


const MenuItem = ({menu}) => {
   return (
       <li className="liMenuStyle"><Link className="LinkMenuStyle" to={menu[1]}>{menu[0]}</Link></li>
   )
}
const MenuList = ({menu_list}) => {
   return (
        <nav className="navStyle">
            <ul className="ulMenuStyle">
                {menus.map((menu) => <MenuItem menu ={menu} />)}
            </ul>
        </nav>
   )
}


export default MenuList
