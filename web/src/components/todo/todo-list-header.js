import React from 'react';

export default class TodoListHeader extends React.Component {
    render(){
        return (
            <thead>
                <tr>
                    <th width="250">Task</th>
                    <th width="100">Action</th>
                </tr>
            </thead>
        );
    }
}
