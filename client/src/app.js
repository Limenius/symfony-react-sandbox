import React from "react";
import ReactOnRails from 'react-on-rails';



var HelloWorld = React.createClass({
  render: function() {
    return (
      <div className="hello">
        Hello, world!
      </div>
    );
  }
});

module.exports = HelloWorld;
