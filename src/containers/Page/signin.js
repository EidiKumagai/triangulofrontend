import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0';
import { login } from './auth';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import api from './api';
//import {login } from '../../helpers/auth0';

//const { login } = login;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    email: "admilsen@corasistemas.com",
    password: "senhacriada"
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.email]: event.target.value
    });
  }

  // handleLogin = () => {
  //   const { login } = this.props;
  //   login();
  //   this.props.history.push('/dashboard');
  // };
  
  handleSubmit = async e  => {
    e.preventDefault();
       const { email, password } = this.state;
       if (!email || !password) {
           this.setState({ error: "Preencha e-mail e senha para continuar!" });
       } else {
           try {
               const response = await api.post("/sessions", { email, password });
               login(response.data.token);
               this.props.history.push("/dashboard");
           } catch (err) {
               this.setState({
                   error:
                       "Houve um problema com o login, verifique suas credenciais. T.T"
               });
           }
       }
  }
  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
       return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper" >
              <Link to="/" >
                 <IntlMessages id="page.signInTitle" /> 
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input value={this.state.email}
          onChange={this.handleChange} size="large" placeholder="Username" />
              </div>

              <div className="isoInputWrapper">
                <Input value={this.state.password}
          onChange={this.handleChange} size="large" type="password" placeholder="Password" />
              
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox disabled={!this.state.value}>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button  type="primary" onClick={this.handleSubmit}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              {/* <p className="isoHelperText">
                <IntlMessages id="page.signInPreview" />
              </p> */}

              <div className="isoInputWrapper isoOtherLogin">
                {/* <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button> */}

                {/* {Auth0.isValid &&
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signInAuth0" />
                  </Button>}

                {Firebase.isValid && <FirebaseLogin login={this.handleLogin} />} */}
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.get('triangulo') !== null ? true : false,
  }),
  { login }
)(SignIn);
