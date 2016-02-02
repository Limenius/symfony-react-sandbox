import React, { PropTypes } from 'react';
import RecipesWidget from '../components/RecipesWidget';
import _ from 'lodash';

// Simple example of a React "smart" component
export default class Recipes extends React.Component {
  render() {
    return (
      <div>
        <RecipesWidget/>
      </div>
    );
  }
}

