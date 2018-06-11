import React, { Component } from 'react';
import requireAuth from './requireAuth';
class Feature extends Component {
  render() {
    return <div>This is the Protected Feature... shhhh</div>;
  }
}

export default requireAuth(Feature);
