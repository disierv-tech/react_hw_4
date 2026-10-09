import React from "react";

class ToDoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => (
          <li key={todo.id} id={todo.id}>
            <div className="row">
              <p>{todo.name}</p>
              <button
                className="delete-button"
                onClick={() => this.props.onDelete(todo.id)}
              >
                Видалити
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default ToDoList;
