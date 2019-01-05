import React from "react";

export default class CreateTodo extends React.Component {
  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <div>
          <div className="row large-6 large-offset-3 medium-6 medium-offset-3 small-6 small-offset-3 columns">
            <input
              type="text"
              placeholder="Type your task here"
              ref="createInput"
            />
          </div>
          <div className="row large-6 large-offset-3 medium-6 medium-offset-3 small-6 small-offset-3 columns">
            <button className="expanded secondary button">+ Add Item</button>
          </div>
        </div>
      </form>
    );
  }

  handleCreate(e) {
    e.preventDefault();
    const createInput = this.refs.createInput;
    if (createInput.value.length) {
      this.props.createTask({
        id: this.guid(),
        task: createInput.value,
        isCompleted: false
      });
      this.refs.createInput.value = "";
    }
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }
}
