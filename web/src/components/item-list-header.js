import React from 'react';

export default class ItemListHeader extends React.Component {
    render(){
        return (
            <thead>
                <tr>
                    <th width="250">Item</th>
                    <th width="250">Date</th>
                    <th width="100">Action</th>
                </tr>
            </thead>
        );
    }
}
