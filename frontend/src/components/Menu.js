import React from 'react'

let menus = [
    "Список пользователей",
    "Ссылка 1",
    "Ссылка 2"
];

const MenuItem = ({menu}) => {
   return (
       <li className="liMenuStyle"><a className="aMenuStyle" href="/">{menu}</a></li>
   )
}
const MenuList = ({menu_list}) => {
   return (

        <ul className="ulMenuStyle">
            {menus.map((menu) => <MenuItem menu={menu} />)}
        </ul>
   )
}


export default MenuList
