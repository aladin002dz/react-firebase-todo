import React, { Component } from 'react';

class Todos extends Component {
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
      <div className="text-center mt-5">
        <h1>
          Todos
        </h1>
      </div>
    );

  }
}

export default Todos;