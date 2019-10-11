import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import { notification } from '../../components/';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ResetPasswordStyleWrapper from './resetPassword.style';
import api from '../Page/api';

class ResetPassword extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      novasenha: '',
      confirmesenha: '',
      error:'Confirm passwd is not equal with new passwd'
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmmit = this.handleSubmmit.bind(this);
  }

  validateResetForm() {
    
      return (
        this.state.novasenha === this.state.confirmesenha
      )
      
    
  }

  handleChange(event){
    this.setState({novasenha: event.target.value});
    console.log(this.state.novasenha);
  }
  handleConfirm(event){
    this.setState({confirmesenha:event.target.value});
  }

  handleSubmmit(){
    const {novasenha} = this.state;
    const { match } = this.props;
     api.put(`/users/forgotPassword/${match.params.token}/${match.params.email}`,
      { 
        newPassword: novasenha
      }).then(res =>{
        notification("success", "Change password success");
        console.log(res)
     });
  }

  render() {

    
    

    return (
      <ResetPasswordStyleWrapper className="isoResetPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.resetPassTitle" />
              </Link>
            </div>

            <div className="isoFormHeadText">
              <h3>
                <IntlMessages id="page.resetPassSubTitle" />
              </h3>
              <p>
                <IntlMessages id="page.resetPassDescription" />
              </p>
            </div>

            <div className="isoResetPassForm">
              <div className="isoInputWrapper">
                <Input value={this.state.novasenha}
                  onChange={this.handleChange}
                  size="large"
                  type="password"
                  placeholder="New Password"
                />
              </div>

              <div className="isoInputWrapper">
                <Input value={this.state.confirmesenha}
                  onChange={this.handleConfirm}
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="isoInputWrapper">
                <Button onClick={this.handleSubmmit} type="primary">
                  <IntlMessages id="page.resetPassSave" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ResetPasswordStyleWrapper>
    );
  }
}

export default ResetPassword;
