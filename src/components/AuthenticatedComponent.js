import React from 'react';
import {push} from 'redux-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

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
        let token = localStorage.getItem('token');
        let userid = localStorage.getItem('userid');
        let redirectAfterLogin = this.props.location.pathname;
        if (token && userid) {
          this.props.actions.checkToken(token, redirectAfterLogin);
        } else {
          this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
        }
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true ?
            <Component {...this.props} /> :
            null
          }
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    token: state.auth.token,
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated
  });

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
    dispatch: dispatch
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
