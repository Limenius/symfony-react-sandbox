import React, { PropTypes } from 'react';

export default class Recipe extends React.Component {

    render() {
        var imgsrc = '/assets/build/img/'+this.props.recipe.image;
        return (
            <div>
                <h3>{this.props.recipe.name}</h3>
                <div className="thumbnail">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={imgsrc} className="img-responsive"/>
                        </div>
                        <div className="col-md-9">
                        <p className="recipe-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat, dui sit amet eleifend volutpat, ante ligula interdum justo, at cursus urna est interdum enim. Ut suscipit elit enim, sed eleifend nunc mollis eget. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris euismod ipsum eu auctor vulputate. Praesent consectetur eros in libero fermentum, sed viverra nulla venenatis. Nullam eu rhoncus magna. Ut rutrum ut ex sit amet blandit. Fusce semper vel elit id mattis. Vestibulum sed urna a quam ultrices ultrices.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
