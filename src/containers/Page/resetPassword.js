import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import { notification } from '../../components/';
import passwordValidator from 'password-validator';
//import zxcvbn from 'zxcvbn';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ResetPasswordStyleWrapper from './resetPassword.style';
import history from './history';
import api from '../Page/api';

class ResetPassword extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      novasenha: '',
      valueButton:'',
      confirmesenha: '',
      isEqual:'',
      error:'Confirm passwd is not equal with new passwd',
      passwdStrong:'',
      validatePass:''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleSubmmit = this.handleSubmmit.bind(this);
  }


  handleChange(event){
   
    if(this.state.novasenha == ''){
      this.setState({novasenha: ''});  
    }
    this.setState({novasenha: event.target.value});
    var schema = new passwordValidator();
    schema
      .is().min(5)                                    // Minimum length 8
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits()                                 // Must have digits
      .has().not().spaces()                           // Should not have spaces
      .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

    var aux = schema.validate(this.state.novasenha);
    if(aux == true){
      this.setState({passwdStrong: 'Your Password is Good'});
      this.setState({validatePass: true});
     
    }else{
      if(aux == false){
        this.setState({passwdStrong: 'Your password must be Strong'});
        //this.setState({novasenha: ''});
        this.setState({validatePass: false});
      }
    }
    
    
    console.log(this.state.novasenha);
  }
  handleConfirm(event){
    this.setState({confirmesenha:event.target.value});
  }

  handleSubmmit(){
    const {novasenha} = this.state;
    const { match } = this.props;
    if(this.state.novasenha === this.state.confirmesenha && this.state.validatePass === true ){
      api.put(`/users/forgotPassword/${match.params.token}/${match.params.email}`,
      { 
        newPassword: novasenha
      }).then(res =>{
        notification("success", "Change password success");
        history.replace('/');
        console.log(res)
     });
    }else{
      notification("error","Password is not Equal or your Password is not Strong");
    }

     
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
                <br></br>
                <br></br>
                <IntlMessages id="page.resetPassObs" />
                
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
              
              
              <p style={{color: 'gray'}}>{this.state.passwdStrong}</p>
              

              <div className="isoInputWrapper">
                <Input value={this.state.confirmesenha}
                  onChange={this.handleConfirm}
                  size="large"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              
              <p>{this.state.msgPassEqual}</p>

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
