/**
 *    TreeMenu reusable React component
 *   
 *    @author Aleksey Shishkevich <aleksey.shishkevich@gmail.com>
 *
 *    @param {string} left
 *    @param {string} top
 *    @param {Array} data
 *    @param {Function} onItemSelect
 *
 */
 
import React from 'react';
import classNames from 'classnames';
import ListMenuComponent from  '../list-menu/ListMenuComponent.jsx'


class TreeMenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data : this.props.data, 
        selected: null, 
        listStack:[{top:this.props.top, left:this.props.left, data:this.props.data}]
    };
  }

  enterItem(item, rect, parent){
      let listStack = this.state.listStack;
      let hasChanges = false;
      while (listStack.length>1 && listStack[listStack.length-1].data != parent){
          hasChanges = true;
          listStack.pop();
      }
      if (item.items && item.items!=listStack[listStack.length-1].data){
         hasChanges = true;
         listStack.push({
             top: rect.top  + "px",
             left: rect.left+rect.width+"px",
             data: item.items
         });
      }
      if (hasChanges){
          this.setState({listStack:listStack});
      }
  }
  
  leaveItem(item){
      //console.log("LEAVE", item);
  }
  
  collapse(){
      let listStack = this.state.listStack;
      listStack.splice(1,listStack.length-1);
      this.setState({listStack:listStack});
  }
  
  onItemSelect(item){
      this.collapse();
      this.props.onItemSelect(item);
  }
  
  render() {

    let set = this.state.listStack.map((data) => {
                let listStyle = {
                    left: data.left,
                    top: data.top,
                };
               return  <ListMenuComponent 
                data = {data.data}
                key = {'menu'+this.state.listStack.indexOf(data)}
                listStyle = {listStyle} 
                enterItem={this.enterItem.bind(this)} 
                leaveItem={this.leaveItem}
                onItemSelect={this.onItemSelect.bind(this)}
                />
           });
    return <div ref="treeMenu" >{set}</div>;
  }

}

export default TreeMenuComponent;