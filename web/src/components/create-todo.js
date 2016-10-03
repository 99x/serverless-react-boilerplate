import _ from 'lodash';
import React from 'react';

export default class CreateTodo extends React.Component {
    render(){
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type='text' placeholder='Enter new todo item' ref='createInput'/>
                <button>Create</button>
            </form>
        );
    }

    handleCreate(e){
        e.preventDefault();
        const createInput = this.refs.createInput;
        if(createInput.value.length){
            this.props.createTask({'id': this.guid(), 'task': createInput.value, 'isCompleted':false});
            this.refs.createInput.value = '';
        }
    }

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }
}
