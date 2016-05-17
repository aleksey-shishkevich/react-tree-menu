import React from 'react';
import {render} from 'react-dom';
import TreeMenuComponent from './components/tree-menu/TreeMenuComponent.jsx'

var data = [
    {key: 0, label: 'TEST0'},
    {key: 1, label: 'TEST1', 
    items: [
        {key: 3, label: 'TEST3', 
        items: [
            {key: 6, label: 'TEST6'},
            {key: 7, label: 'TEST7'},
        ]},
        {key: 4, label: 'TEST4'}, 
        {key: 5, label: 'TEST5',
         items:[
             {key: 8, label: 'TEST8'},
             {key: 9, label: 'TEST9'},
         ]   
        },
    ]},
    {key: 2, label: 'TEST2'},
];


class App extends React.Component {
  onItemSelect(item){
      alert("Item " + item + " has been selected");
  }
  
  render () {
    return (<div>
    <TreeMenuComponent data={data} left="100px" top="100px" onItemSelect={this.onItemSelect}/>
    </div>);
  }
}

render(<App/>, document.getElementById('app'));