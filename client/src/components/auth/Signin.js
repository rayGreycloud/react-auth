import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Signin extends Component {
  // Handler is arrow func so bind(this) unnecessary
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    // Provided by redux form
    const { handleSubmit } = this.props;

    return (
      // Pass in handler to handleSubmit
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email </label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
            placeholder=" enter your email"
          />
        </fieldset>
        <fieldset>
          <label>Password </label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
            placeholder=" enter your password"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign In</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage
});

// compose allows multiple HOC to be applied
export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);
