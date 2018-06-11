import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends Component {
    // The reusable logic
    componentDidMount = () => {
      this.shouldNavigateAway();
    };

    componentDidUpdate = () => {
      this.shouldNavigateAway();
    };

    shouldNavigateAway = () => {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    };

    // Pass down props - down break the chain!
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  // Connecting any needed state
  const mapStateToProps = state => ({
    auth: state.auth.authenticated
  });
  // Return wrapped component
  return connect(mapStateToProps)(ComposedComponent);
};
