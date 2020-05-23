import React, { Component } from 'react'
import './App.css';
import Input from './components/Input';
import Button from './components/Button';
import Small from './components/Small';
import * as messages from './common/message'
import Notification from './components/Notification';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActions from './actions/action'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        valid: true,
        error: ''
      },
      password: {
        value: '',
        valid: true,
        error: ''
      },
      showPassword: false,
    }
  }

  handleChange = (event) => {
    let test = true
    let err = ''
    switch(event.target.name) {
      case "email":
        let reEmail = /^[a-zA-Z0-9]+[.]{0,1}[a-zA-Z0-9]+[@][a-z]+([.][a-z]{2,})+$/
          let testEmail = reEmail.test(event.target.value)
          if(!event.target.value){
            test = false;
            err = messages.PLEASE_TYPE_INPUT_EMAIL;
          }else{
            if(testEmail){
                test = true;
            }else{
                test = false;
                err = messages.EMAIL_ADDRESS_IS_INVALID;
            }
          }
          break
      case "password":
        if(!event.target.value){ 
          test = false;
          err = messages.PLEASE_TYPE_INPUT_PASSWORD;
        }else {
          if(event.target.value.length >= 8){
            test = true;
          }else {
            test = false;
            err = messages.PASSWORD_IS_INVALID;
          }
        }
        break
    }
    this.setState({
      [event.target.name]: {value: event.target.value, valid: test, error: err}
    })
  }

  validMessage = (valid, message) => {
    if(!valid) {
      return (
        <Small title={message} className="small" />
      )
    }
  }

  handleCheckbox = (event) => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    if(this.state.email.valid && this.state.password.valid){
      let user = {
        email: this.state.email.value,
        password: this.state.password.value
      }
      this.props.getActions.login(user);  
    }
  }

  exitNotifi = () => {
    localStorage.removeItem('token')
    this.props.getActions.exitNotification();
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
  }  

  render() {
    if(this.props.notification){
      setTimeout(() => {
        this.exitNotifi();
      }, 2000)
    }
    return (
      <div>
      <div className="loginbox">
        <h1>Log in to your accout</h1>
        <form onSubmit={(event) => this.handleLogin(event)}>
          <div className="form-input">
            <label>Email or Username</label>
            <Input 
            id="email"
            type="text" 
            name="email" 
            placeholder="Enter Email or Username"
            autoComplete="off"
            required={true}
            className={this.state.email.valid ? 'input' : 'input-invalid'}
            onChange={this.handleChange} />
            {this.validMessage(this.state.email.valid,this.state.email.error)}
          </div>    
          <div className="form-input">
            <label>Password</label>
            <Input 
            id="password"
            type={this.state.showPassword ? 'text' : 'password'} 
            name="password" 
            placeholder="Enter Password" 
            required={true}
            className={this.state.password.valid ? 'input' : 'input-invalid'}
            onChange={this.handleChange} />
            {this.validMessage(this.state.password.valid,this.state.password.error)}
            <Input type="checkbox" name="showpassword" required={false} value="show" className="input-checkbox" onClick={this.handleCheckbox} />
            <label> Show Password</label><br />
          </div>
          <Button className="btn-login" value="Login" />
        </form>
        <div style={{textAlign: "center"}}>
          <label>Don't have an account?</label> <a href="#">Register</a>
        </div>
      </div>
      {localStorage.getItem('token') && this.props.notification ? <Notification 
      className="alert-successfull"
      title="Login successfull!!!"
      onClick={this.exitNotifi} />
      : !localStorage.getItem('token') && this.props.notification ? <Notification 
      className="alert-faile"
      title="Login faile, please type email again!!!"
      onClick={this.exitNotifi} /> : ''}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      getActions: bindActionCreators(getActions, dispatch)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      notification: state.notification,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

