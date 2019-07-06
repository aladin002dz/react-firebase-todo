import React, { Component } from 'react';
import TodosList from './TodosList';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.todoName);
    this.setState({ todoName: '' });
  }



  render() {
    const { user } = this.props;
    if(user === null){
      return (
        <div className="text-center mt-5">
          <h1>
            Please login
          </h1>
        </div>
      );
    }

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Todo</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form
                  className="formgroup"
                  onSubmit={this.handleSubmit}
                >
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      name="todoName"
                      placeholder="Todo name"
                      aria-describedby="buttonAdd"
                      value={this.state.todoName}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-sm btn-info"
                        id="buttonAdd"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-8 text-center">
            <div className="card border-top-0 rounded-0">
              {this.props.todos && this.props.todos.length ? (
                <div className="card-body py-2">
                  <h4 className="card-title font-weight-light m-0">
                    Your Todos
                  </h4>
                </div>
              ) : null}

              {this.props.todos && (
                <div className="card-body py-2">
                  <TodosList
                    userID={this.props.userID}
                    todos={this.props.todos}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Todos;


