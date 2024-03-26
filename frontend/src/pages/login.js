import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Profile } from "./profile";

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      email:"",
      password:"",
      passwordVisible: false // Track password visibility
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    fetch("http://localhost:3002/login-user",{
      method:"POST",
      crossDomain: true,
      headers:{
        "Content-Type":"Application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        email,
        password,
      })
    }).then((res)=> res.json())
      .then((data)=> {
        console.log(data, "userRegister");
        if(data.status === "success"){
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href= "./Profile";
        }
      });
  }

  togglePasswordVisibility() {
    this.setState(prevState => ({
      passwordVisible: !prevState.passwordVisible
    }));
  }

  render(){
    return (
      <div className="loginPage"> 
        <div className="loginbackground">
          <img
            src="blur-background.jpg" 
            className="backgroundImage"
            alt="Background"
          />
        </div>
        <form className="loginContainer" onSubmit={this.handleSubmit}>
          <h3>Log In</h3>
          <label className="label-container">
            <i className="fa-solid fa-envelope email-icon"></i>
            <span>E-mail Address:</span>
          </label>
          <div className="mailContainer"></div>
          <input
            id="inputmail"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="E-mail"
          />
          <br />
          <label className="label-container">
            <i className="fa-solid fa-lock password-icon"></i>
            <span>Password:</span>
          </label>
          <div className="passwordContainer">
            <input
              id="inputPassword"
              type={this.state.passwordVisible ? 'text' : 'password'}
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="password"
            />
            <button
              type="button"
              className="eyeButton"
              onClick={this.togglePasswordVisibility}
            >
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>
          <br />
          <p>
            Not a member? Sign up for free <Link to="/register"> here!</Link>
            <br />
          </p>
          <div className="loginContainerButtonWrapper">
            <button type="submit" style={{ textDecoration: 'none' }}>
              Log In
            </button>
          </div>
        </form>   
      </div>
    );
  }
}