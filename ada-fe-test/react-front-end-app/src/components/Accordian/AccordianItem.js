import React from 'react';

/* STYLESHEETS */
import './AccordianItem.css';

class AccordianItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      id: props.id,
      title: props.title,
      connections: props.connections,
      node: props.node,
      items: [],
    };
  }

  componentDidMount() {
    if (this.state.connections !== null) {
      this.state.connections.map((conn) => {
        return(
          fetch('http://localhost:5000/nodes/' + conn,{
            method: 'GET',
            mode: 'cors',
            header: {"Access-Control-Allow-Origin":"*"}
          })
          .then((response) => response.json())
          .then((data) => this.setState({ items: this.state.items.concat(data) }))
          .catch((error) => {
            console.error('Error:', error);
          })
        );
      })
    }
  }

  render () {
    const { opened } = this.state
    return (
      <div
      key={ this.state.id }
      className={`accordion-item ${opened && 'accordion-item--opened'}`}
      onClick={ () => { this.setState({ opened: !opened }) } }
      >
        <div {...{ className: 'accordion-item__line' }}>
          <h3 className='accordion-item__title'>
            { this.state.title }
          </h3>
          <span className='accordion-item__icon' > </span>
        </div>
          <div {...{ className: 'accordion-item__inner' }} >
            <div {...{ className: 'accordion-item__content' }} >
              <p className='accordion-item__paragraph' >
                <ul>
                {
                  this.state.items ?
                  this.state.items.map((item) => {
                    return(
                      <li>{item.title}</li>
                    );
                  }) : <li>No connections</li>
                }
                </ul>
              </p>
            </div>
          </div>
      </div>
    )
  }
}

export default AccordianItem;
