import React from 'react';
import {Input, Glyphicon, ButtonInput} from 'react-bootstrap';

class RegisterFormComponent extends React.Component {

  render() {
    const innerUserIcon = <Glyphicon bsClass="glyphicon usericon" glyph="user" />;
    const innerEmailIcon = <Glyphicon bsClass="glyphicon envelope" glyph="envelope" />;
    const innerKeyIcon = <Glyphicon bsClass="glyphicon lock" glyph="lock" />;
    return (
      <form>
        <Input
           type="text"
           placeholder="Username"
           addonBefore={innerUserIcon} />
        <Input
           type="text"
           placeholder="JrC Email"
           addonBefore={innerEmailIcon} />
        <Input
           type="password"
           placeholder="Password"
           addonBefore={innerKeyIcon} />
        <Input
           type="password"
           placeholder="Repeat Password"
           addonBefore={innerKeyIcon} />
        <hr />
        <Input
           type="text"
           placeholder="First Name"
           addonBefore={innerUserIcon} />
        <Input
           type="text"
           placeholder="Last Name"
           addonBefore={innerUserIcon} />
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

export default RegisterFormComponent;
