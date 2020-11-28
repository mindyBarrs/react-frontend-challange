import React from 'react';

/* COMPONENTS */
import AccordianItem from './AccordianItem';

/* STYLESHEET */
import "./Accordian.css"

const Accordian = ({ nodes, onNodeSelect }) => {
    return(
        <div className="wrapper" >
          <ul className="accordion-list" >
            {
              nodes ?
              nodes.map((node) => {
                return(
                  <li key={ node.id } onClick={ () => onNodeSelect(node) } className="accordion-list__item">
                    <AccordianItem
                      title={ node.title }
                      id={ node.id }
                      connections={ node.connections }
                      node={ node }
                    />
                  </li>
                );
              }) : "Loading..."
            }
          </ul>
        </div>
    );
}

export default Accordian;
