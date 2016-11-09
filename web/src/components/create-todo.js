import React from 'react';

export default class CreateTodo extends React.Component {
    render(){
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <div>
                    <div className="row large-6 large-offset-3 medium-6 medium-offset-3 small-6 small-offset-3 columns">               
                        <input type='text' placeholder='Type your task here' ref='nameInput'/>                        
                    </div>
                    <div className="row large-6 large-offset-3 medium-6 medium-offset-3 small-6 small-offset-3 columns">               
                        <input type='text' placeholder='Enter date YYYY-MM-DD' ref='dateInput'/>                        
                    </div>
                    <div className="row large-6 large-offset-3 medium-6 medium-offset-3 small-6 small-offset-3 columns">
                        <button className="expanded secondary button">+ Add Item</button>
                    </div>
                </div>
            </form>    
        );
    }

    handleCreate(e){
        e.preventDefault();
        if(this.refs.nameInput.value.length){
            this.props.createTodo({
                'todoName': this.refs.nameInput.value, 
                'todoDate': this.refs.dateInput.value,
                'enabled': true
            });
            this.refs.nameInput.value = '';
            this.refs.dateInput.value = '';
        }
    }
}
