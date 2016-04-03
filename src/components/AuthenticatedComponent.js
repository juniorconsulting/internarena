import React from 'react';
import {push} from 'redux-router';
import {connect} from 'react-redux';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
      }
    }

    render() {
      return (
          <div>
          {this.props.isAuthenticated === true
           ? <Component {...this.props} />
           : null
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
