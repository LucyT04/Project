import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from "./sidebar";

export default class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      userData: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:3002/userData",{
      method:"POST",
      crossDomain: true,
      headers:{
        "Content-Type":"Application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        token:window.localStorage.getItem("token"),
      })
  }).then((res)=> res.json())
  .then((data)=> {
    console.log(data, "userData");
    this.setState({userData: data.data});
  });
  }

  // logOut=()=>{
  //   window.localStorage.clear();
  //   window.location.href="./login";
  // }

  render() {
  return (
    <div className="mainContent">
      <Sidebar />
      <h1 className="profileHeader"> Welcome Back, {this.state.userData.fname}</h1>
      <div className="profileContainer">
        <img src="male-avatar.png" alt="Profile" className="profileImage" />
        <div className="profileDetails">
        <h2 className="profileName">Name: {this.state.userData.fname} {this.state.userData.lname}</h2>
          <div className="extraProfileDetails">
            <p>Email: {this.state.userData.email}</p>
          
          </div>
        </div>
      </div>
      <div className="achievementsSection">
        <h2>Achievements and Rewards:</h2>
        <div className="underline"></div>
        <br/>
        <div className="achievementImages">
          {/* Image 1 */}
          <div className="achievement">
            <img src="newbie.png" alt="Achievement 1" />
            <p>Newbie</p>
          </div>

          {/* Image 2 */}
          <div className="achievement">
            <img src="first-completed.png" alt="Achievement 2" />
            <p>First Class</p>
          </div>

          {/* Image 3 */}
          <div className="achievement">
            <img src="streak.png" alt="Achievement 3" />
            <p>Streak</p>
          </div>
        </div>
      </div>
      <div className="bioContainer">
        <h1> Profile Bio:</h1>
        <div className="underline"></div>
        <p className="bioText">
          Hello, my name is David, and I am new to Literassist! My goal is to improve my reading and writing skills to make daily life easier!
        </p>
      </div>
    </div>
    
  );
};
}