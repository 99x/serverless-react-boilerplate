import _ from 'lodash';
import React from 'react';
import ItemListHeader from './item-list-header';
import ItemListItem from './item-list-item';

export default class ItemList extends React.Component {
    renderItems(){
        const props = _.omit(this.props, 'items');
        return _.map(this.props.items, (event, index) => <ItemListItem key={index} {...event} {...props} />);
    }
    render(){
        return (
            <div>                
                <div className="row large-6 large-offset-3 medium-6 medium-offset-3 small-6 small-offset-3 columns">                   
                    <table className="hover">
                        <ItemListHeader/>
                        <tbody>
                           {this.renderItems()}
                        </tbody>
                    </table>                       
                </div>               
            </div>            
        );
    }
}
