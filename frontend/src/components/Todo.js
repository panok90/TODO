import React from 'react'


const TodoItem = ({todo}) => {
   return (
       <tr>
           <td>
               {todo.id}
           </td>
           <td>
               {todo.project}
           </td>
           <td>
               {todo.user}
           </td>
           <td>
               {todo.text_todo}
           </td>
           <td>
               {todo.created_at}
           </td>
           <td>
               {todo.updated_at}
           </td>
       </tr>
   )
}

const TodoList = ({todos}) => {
   return (
       <table>
           <th>
               ID
           </th>
           <th>
               Project
           </th>
           <th>
               User
           </th>
           <th>
               Text
           </th>
           <th>
               Created at
           </th>
           <th>
               Updated at
           </th>
           {todos.map((todo) => <TodoItem todo={todo} />)}
       </table>
   )
}


export default TodoList
