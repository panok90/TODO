import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {projects: [], users: [], text_todo: '', todo_is_active: 1}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
    }

    handleSubmit(event) {
      this.props.createTodo(this.state.projects, this.state.users, this.state.text_todo, this.state.todo_is_active)
      event.preventDefault()
    }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
                <label htmlFor="project">project</label>
                <select name="projects" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="user">user</label>
                 <select name="users" className='form-control' onChange={(event)=>this.handleChange(event)}>
                    {this.props.users.map((item)=><option value={item.id}>{item.username}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="text_todo">text</label>
                <input type="text" className="form-control" name="text_todo" value={this.state.text_todo} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="form-group">
                <label htmlFor="todo_is_active">is active</label>
                <input type="checkbox" className="form-control" name="todo_is_active" value={this.state.todo_is_active} onChange={(event)=>this.handleChange(event)} />
            </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

export default TodoForm

