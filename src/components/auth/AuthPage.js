import React from 'react';
import {Col, Grid, Row} from 'react-bootstrap';

let jrcLogo = require('../../images/jr_white.svg');
require('../../styles/login/AuthPage.scss');

class AuthPage extends React.Component {

  render() {
    return (
      <div className="auth-container">
        <Grid>
          <Col sm={6} smOffset={3} md={4} mdOffset={4} xs={12} className="auth-form">
            <Row>
              <img src={jrcLogo} alt="JrC Logo" className="img-responsive" id="logo" />
            </Row>
            <Row>
              <this.props.form next={this.props.next} />
            </Row>
          </Col>
        </Grid>
      </div>
    );
  }
}

export default AuthPage;
