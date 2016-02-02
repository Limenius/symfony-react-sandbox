import React, { PropTypes } from 'react';

export default class Recipe extends React.Component {

    render() {
        var imgsrc = "http://lorempixel.com/400/200/food/"+this.props.id;
        return (
            <div className="container">
            <img src={imgsrc}/>
            {this.props.name}
            </div>
        );
    }
}
