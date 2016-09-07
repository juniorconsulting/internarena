import React from 'react';
import {Input, Glyphicon, ButtonInput, Alert} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActionCreators from '../../actions/auth';

class RegisterFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      firstName: '',
      lastName: ''
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePassword1Change(e) {
    this.setState({password1: e.target.value});
  }

  handlePassword2Change(e) {
    this.setState({password2: e.target.value});
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  }

  register(e) {
    e.preventDefault();
    this.props.actions.registerUser(
      this.state.username,
      this.state.email,
      this.state.password1,
      this.state.password2,
      this.state.firstName,
      this.state.lastName
    );
  }

  render() {
    const innerUserIcon = <Glyphicon bsClass="glyphicon usericon" glyph="user" />;
    const innerEmailIcon = <Glyphicon bsClass="glyphicon envelope" glyph="envelope" />;
    const innerKeyIcon = <Glyphicon bsClass="glyphicon lock" glyph="lock" />;
    let errorMessages = null;
    let messages = [];

    if (this.props.statusText) {
      this.props.statusText.split(',').forEach(function(message) {
        messages.push(<li>{message}</li>);
      });
    }

    return (
      <form onSubmit={this.register.bind(this)}>
        {errorMessages ?
          <Alert bsStyle="danger">{messages}</Alert> :
          null
        }
        <Input
           type="text"
           placeholder="Username"
           addonBefore={innerUserIcon}
           onChange={this.handleUsernameChange.bind(this)}
           value={this.state.username}
           required />
        <Input
           type="text"
           placeholder="JrC Email"
           addonBefore={innerEmailIcon}
           onChange={this.handleEmailChange.bind(this)}
           value={this.state.email}
           required />
        <Input
           type="password"
           placeholder="Password"
           addonBefore={innerKeyIcon}
           onChange={this.handlePassword1Change.bind(this)}
           value={this.state.password1}
           required />
        <Input
           type="password"
           placeholder="Repeat Password"
           addonBefore={innerKeyIcon}
           onChange={this.handlePassword2Change.bind(this)}
           value={this.state.password2}
           required />
        <hr />
        <Input
           type="text"
           placeholder="First Name"
           addonBefore={innerUserIcon}
           onChange={this.handleFirstNameChange.bind(this)}
           value={this.state.firstName}
           required />
        <Input
           type="text"
           placeholder="Last Name"
           addonBefore={innerUserIcon}
           onChange={this.handleLastNameChange.bind(this)}
           value={this.state.lastName}
           required />
        <ButtonInput
           type="submit"
           className="form-control"
           bsStyle="danger"
           value="Register"
           block />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isRegistering: state.auth.isRegistering,
  statusText: state.auth.statusText
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormComponent);
