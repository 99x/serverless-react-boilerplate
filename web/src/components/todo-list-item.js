import React from 'react';
import TodoListHeader from './todo-list-header';

export default class TodoListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing:false
        };
    }

    renderActionSection() {
        const style = {
            marginRight: '5px',
            width: '75px'
        };
        if(this.state.isEditing){
            return (
                <td>
                    <button style={style} type="button" className="success button" onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button style={style} type="button" className="secondary button" onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </td>
            );
        }
        return (
            <td>
                <button style={style} type="button" className="button" onClick={this.onEditClick.bind(this)}> Edit </button>
                <button style={style} type="button" className="alert button" onClick={this.onDeleteClick.bind(this)}> Delete </button>
            </td>
        );
    }

    render(){
         const {id, userId, todoName, todoDate, createdAt, enabled} = this.props;
         const eventStyle = {
            color: enabled? '#d35400' : '#2ecc71',
            textDecoration: enabled ? '' : 'line-through',
            fontSize: '20px',
            cursor: 'pointer'
        };
         if(this.state.isEditing){
            return (
                <tr>
                    <td>
                        <form onSubmit={this.onSaveClick.bind(this)}>
                            <input type='text' defaultValue={todoName} ref='nameInput'/>
                        </form>
                    </td>
                    <td>
                        <form onSubmit={this.onSaveClick.bind(this)}>
                            <input type='text' defaultValue={todoDate} ref='dateInput'/>
                        </form>
                    </td>
                    {this.renderActionSection()}
                </tr>
            );
        }
        return (
            <tr>
                <td style={eventStyle} onClick={this.props.toggleTodo.bind(this, this.props)}>
                    {todoName}
                </td>
                <td>{todoDate}</td>
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
        const oldTodo = this.props;
        var newTodo = {
            "todoName": this.refs.nameInput.value,
            "todoDate": this.refs.dateInput.value
        };
        this.props.saveTodo(oldTodo, newTodo);
        this.setState({isEditing:false});
    }

    onDeleteClick(e){
        e.preventDefault();
        this.props.deleteTodo(this.props);
    }
}
