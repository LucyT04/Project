import React, { Component} from "react";
import { Link } from 'react-router-dom';

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      fname:"",
      lname:"",
      email:"",
      password:"",
      confirm:"",
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault();
    const { fname, lname, email, password, confirm } = this.state;
    console.log(fname, lname, email, password, confirm);
    fetch("http://localhost:3002/register",{
      method:"POST",
      crossDomain: true,
      headers:{
        "Content-Type":"Application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        confirm,
      })
  }).then((res)=> res.json())
  .then((data)=> {
    console.log(data, "userRegister");
  });
}

  render(){
    return ( 
      <div className="registerPage"> 
        <div className="registerbackground">
          <img src="blur-background.jpg" className="backgroundImage" alt="Background" />
        </div>
        <form className="registerContainer" onSubmit={this.handleSubmit}>
          <h1>Create an Account</h1>
          <label>First Name:</label>
          <input
            id="inputRegister"
            autoComplete="off"
            name="fname" // Changed name to fname
            value={this.state.fname} // Added value attribute
            onChange={this.handleChange} // Added onChange event
            placeholder="first name"
          />
          <br/>
          <label>Surname:</label>
          <input
            id="inputSurname"
            autoComplete="off"
            name="lname" 
            value={this.state.lname} 
            onChange={this.handleChange}
            placeholder="surname"
          />
          <br/>
          <label>Email Address:</label>
          <input
            id="inputEmail"
            autoComplete="off"
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            placeholder="email address"
          />
          <br/>
          <label>Password:</label>
          <input
            id="inputPassword"
            autoComplete="off"
            type="password"
            name="password" 
            value={this.state.password} // Added value attribute
            onChange={this.handleChange} // Added onChange event
            placeholder="password"
          />
          <br/>
          <label>Confirm Password:</label>
          <input
            id="inputConfirm"
            autoComplete="off"
            type="password"
            name="confirm" // Changed name to confirm
            value={this.state.confirm} // Added value attribute
            onChange={this.handleChange} // Added onChange event
            placeholder="confirm password"
          />
          <br/>
          <p> Agree to the Terms and Conditions</p>
          <div className="registerContainerButtonWrapper">
            <button type="submit">Register</button>
          </div>
        </form>     
      </div>
    );
  }
}