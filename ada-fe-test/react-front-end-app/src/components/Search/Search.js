import React from "react";

/* STYLESHEET */
import "./Search.css"

class SearchBar extends React.Component {
    state = {
        node: ""
    };

    onInputChange = (event) => {
        this.setState({ node: event.target.value });

    };

    onFormSubmit = event => {
        event.preventDefault();

        this.props.onFormSubmit(this.state.node);
    };

    render(){
        return(
            <div className="searchBar">
                <form onSubmit={ this.onFormSubmit } className="">
                    <div className="">
                        <label>Search</label>

                        <input type="text" value={ this.state.node } onChange={ this.onInputChange }/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;
