/**
 *    ListMenu - React component
 *   
 *    @author Aleksey Shishkevich <aleksey.shishkevich@gmail.com>
 *
 *    @param {Array} data
 *    @param {Function} listStyle
 *    @param {Function} enterItem
 *    @param {Function} leaveItem
 *    @param {Function} onItemSelect
 *
 */

import React from 'react';
import classNames from 'classnames';
require('./assets/css/ListMenuComponent.css');


class ListMenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data : this.props.data, selected: null};
  }

  onMouseEnter(item){
      var x = this.refs['item'+item.key].getBoundingClientRect();
      this.setState({selected: item.key});
      this.props.enterItem(item, this.refs['item'+item.key].getBoundingClientRect(), this.props.data);
  }
  
  onMouseLeave(item){
      this.props.leaveItem(item);
  }

  render() {
    return (
      <ul style={this.props.listStyle}>
        {this.state.data.map((item)=>{
            var classes = classNames({
                selected: item.key == this.state.selected
            });
            return <li  key={item.key} 
                        className={classes}
                        ref={'item'+item.key}
                        onMouseLeave={this.onMouseLeave.bind(this, item)}
                        onMouseEnter={this.onMouseEnter.bind(this, item)}
                        onClick={this.props.onItemSelect.bind(null, item.label)}
                        >
                        {item.label}
                    </li>
        })}
      </ul>
    );
  }

}

export default ListMenuComponent;