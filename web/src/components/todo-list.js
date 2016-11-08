import _ from 'lodash';
import React from 'react';
import TodoListHeader from './todo-list-header';
import TodoListItem from './todo-list-item';

export default class TodoList extends React.Component {
    renderItems(){
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, index) => <TodoListItem key={index} {...todo} {...props} />);
    }
    render(){
        return (
            <div>
                <div className="row large-6 large-offset-3 medium-6 medium-offset-3 small-6 small-offset-3 columns">                   
                    <table className="hover">
                        <TodoListHeader/>
                        <tbody>
                           {this.renderItems()}
                        </tbody>
                    </table>                       
                </div>               
            </div>            
        );
    }
}
