import React from "react";
import ToDoList from "./ToDoList";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: 1, name: "Покормити кота" },
        { id: 2, name: "Полити квіти" },
        { id: 3, name: "Зателефонувати бабусі" },
      ],

      inputValue: "",
    };
  }

  componentDidMount() {
    const isTodos = localStorage.getItem("todos");
    if (isTodos) {
      this.setState({ todos: JSON.parse(isTodos) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      if (this.state.todos.length === 0) {
        localStorage.removeItem("todos");
      } else {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
      }
    }
  }

  addTodo = () => {
    const text = this.state.inputValue.trim();
    if (text === "") return;
    const newId =
      this.state.todos.length > 0
        ? Math.max(...this.state.todos.map((todo) => todo.id)) + 1
        : 1;

    const newTodo = { id: newId, name: text };
    this.setState({
      todos: [...this.state.todos, newTodo],

      inputValue: "",
    });
  };

  handleEnterKey = (event) => {
    if (event.key === "Enter") {
      this.addTodo();
    }
  };

  handleDeleteButton = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  handleClearButton = () => {
    this.setState({ todos: [] });
  };

  render() {
    return (
      <>
        <h2>Введіть задачу</h2>
        <input
          name="text"
          value={this.state.inputValue}
          onChange={(event) =>
            this.setState({ inputValue: event.target.value })
          }
          onKeyDown={this.handleEnterKey}
        />
        <button onClick={this.addTodo}>Додати запис</button>
        <ToDoList todos={this.state.todos} onDelete={this.handleDeleteButton} />
        <button className="delete-button" onClick={this.handleClearButton}>
          Очистити список
        </button>
      </>
    );
  }
}

export default App;
