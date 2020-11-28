import React from 'react';

/* STYLESHEET */
import "./DetailView.css";

const DetailView = ({ node }) => {
  if(!node) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {
        node.content.map((content) => {
          if (content.type === "text" && content.body !== "") {
            return (
              <div className="card" key={node.content.indexOf(content)+1}>
               { content.body }
              </div>
            );
          } else if (content.type === "image") {
            return(
              <div className="card" key={node.content.indexOf(content)+1}>
               <img src={ content.url } width="400" height="350"/>
              </div>
            );
          }
        })
      }
    </div>
  );
}

export default DetailView;
