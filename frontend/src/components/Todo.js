import React from 'react'
import {Link} from 'react-router-dom';

const TodoItem = ({todo, deleteTodo}) => {
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
            <td>
               <button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button>
           </td>
       </tr>
   )
}

const TodoList = ({todos, deleteTodo}) => {
   return (
        <div>
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
               <th>
               </th>
               {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
           </table>
                <Link to='/todos/create'>Create</Link>
       </div>
   )
}


export default TodoList
