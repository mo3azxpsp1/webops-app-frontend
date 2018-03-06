import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import Axios from 'axios';

export default class SignUp extends Component{
  constructor(){
    super()
    this.state = {
      email:'',
      firstName:'',
      lastName:'',
      password:'',
      passwordConfirmation:'',
      redirect: false
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(e){
    this.setState({...this.state, [e.target.name]: e.target.value});
  }

  _handleSubmit(e){
    e.preventDefault();
    Axios.post( 'http://localhost:3000/signup.json' , { user: {
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    }
    })
    .then((response) => {
      console.log('response then',response);
      this.setState({
        ...this.state,
        redirect: true
      });
    })
    .catch(function (error) {
      alert(JSON.stringify(error.response.data));
    });
  }

  render(){
    if (this.state.redirect){
      return <Redirect to="/" />
    }
    return(
      <div className="user-signup-form">
        <p>Please enter your data</p>
        <form onSubmit={this._handleSubmit} >
          <div className="user-signup">
            <label className="label">Email</label>
            <input className="input-field" type="email" name="email" onChange={this._handleChange} required/>
          </div>
          <div className="user-signup">
            <label className="label">First name</label>
            <input className="input-field" type="text" name="firstName" onChange={this._handleChange} required/>
          </div>
          <div className="user-signup">
            <label className="label">Last name</label>
            <input className="input-field" type="text" name="lastName" onChange={this._handleChange} required/>
          </div>
          <div className="user-signup">
            <label className="label">Password</label>
            <input className="input-field" type="password" name="password" onChange={this._handleChange} required/>
          </div>
          <div className="user-signup">
            <label className="label">Password confirmation</label>
            <input className="input-field" type="password" name="passwordConfirmation" onChange={this._handleChange} required/>
          </div>
          <input id="signup-button" type="submit" value="Sign up"/>
        </form>
      </div>
    )
  }
}