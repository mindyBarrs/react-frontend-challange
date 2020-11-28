import React from 'react';

/* COMPONENTS */
import Accordian from './components/Accordian/Accordian';
import Search from './components/Search/Search';
import DetailView from './components/DetailView/DetailView'

/* STYLESHEETS */
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNode: null,
      nodes: []
    }
  }

    componentDidMount() {
      fetch('http://localhost:5000/nodes',{
        method: 'GET',
        mode: 'cors',
        header: {"Access-Control-Allow-Origin":"*"}
      })
      .then((response) =>  response.json())
      .then((data) => data.map((d) => {
        return (
          fetch('http://localhost:5000/nodes/' + d.id,{
            method: 'GET',
            mode: 'cors',
            header: {"Access-Control-Allow-Origin":"*"}
          })
          .then((response) => response.json())
          .then((data) => this.setState({nodes: this.state.nodes.concat(data)}))
          .catch((error) => {
              console.error('Error:', error);
          })
        );
      }))
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    onTermSubmit = ( term ) => {
      fetch('http://localhost:5000/nodes/search?query=', {
        method: 'POST',
        mode: 'no-cors',
        header: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(term),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };

    onNodeSelect = ( node ) => {
        this.setState({ selectedNode: node });
    };

    render() {
      return (
        <div className="App content">
            <div className="sideBar">
              <Search onFormSubmit={ this.onNodeSubmit }/>

              <Accordian onNodeSelect={ this.onNodeSelect } nodes={ this.state.nodes }/>
            </div>

            <div className="details">
              <DetailView node={ this.state.selectedNode } />
            </div>
        </div>
      );
    }
}

export default App;
