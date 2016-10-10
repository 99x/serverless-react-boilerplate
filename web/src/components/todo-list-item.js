import _ from 'lodash';
import React from 'react';
import TodoListHeader from './todo-list-header';

export default class TodoListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing:false
        };
    }

    renderTaskSection(){
        const {task, isCompleted} = this.props;
        const taskStyle = {
            color: isCompleted? 'green' : 'red',
            'textDecoration': isCompleted? 'line-through' : '',
            cursor: 'pointer'
        };
        if(this.state.isEditing){
            return (
                <td>
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type='text' defaultValue={task} ref='editInput'/>
                    </form>
                </td>
            );
        }
        return(
            <td style={taskStyle} onClick={this.props.toggleTask.bind(this, this.props)}>
                {task}
            </td>
        );
    }

    renderActionSection(){
        if(this.state.isEditing){
            return (
                <td>
                    <button onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </td>
            );
        }
        return (
            <td>
                <button onClick={this.onEditClick.bind(this)}> Edit </button>
                <button onClick={this.onDeleteClick.bind(this)}> Delete </button>
            </td>
        );
    }

    render(){
        return (
            <tr>
                {this.renderTaskSection()}
                {this.renderActionSection()}
            </tr>
        );
    }

    onEditClick(){
        this.setState({isEditing: true});
    }

    onCancelClick(){
        this.setState({isEditing: false});
    }

    onSaveClick(e){
        e.preventDefault();
        const oldTask = this.props;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({isEditing:false});
    }

    onDeleteClick(e){
        e.preventDefault();
        this.props.deleteTask(this.props)
    }
}
