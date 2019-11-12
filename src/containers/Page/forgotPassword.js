import React from 'react';
import { notification } from '../../components/';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './forgotPassword.style';
import history from '../Page/history';

import api from '../Page/api';


class ForgotPassword extends React.Component {

  constructor(props){
    super(props)
    this.state={
      email:''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  
  handleChange = event => {
    this.setState({email: event.target.value});
  }

  handleSubmit(){
    const {email} = this.state;
      
        api.post("https://api-triangulo.herokuapp.com/users/forgotPassword",{ email }).then(res =>{
          console.log(res)
          notification("success", "Check your email to change your password");
          history.replace('/');
        })
        .catch(function (error) {
          // handle error
          notification("error", "Something is wrong, talk to your supervisor");
          console.log(error);
        });  
      
        

  }


  render() {
    return (
      <ForgotPasswordStyleWrapper className="isoForgotPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.forgetPassTitle" />
              </Link>
            </div>

            <div className="isoFormHeadText">
              <h3>
                <IntlMessages id="page.forgetPassSubTitle" />
              </h3>
              <p>
                <IntlMessages id="page.forgetPassDescription" />
                
              </p>
            </div>

            <div className="isoForgotPassForm">
              <div className="isoInputWrapper">
                <Input value={this.state.email}  onChange={this.handleChange} size="large" placeholder="Email"/>
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" onClick={() => this.handleSubmit()} >
                  <IntlMessages id="page.sendRequest" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ForgotPasswordStyleWrapper>
    );
  }
}

export default ForgotPassword;
