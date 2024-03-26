import React from 'react';
// import './App.css';
import {sidebarData} from "./sidebarData";
import { Link } from 'react-router-dom';


export const Sidebar = () => {
  return ( 
    <div className="Sidebar">
        <ul className = "SidebarList">
        {sidebarData.map((val, key) =>{
        return ( 
        <li 
        key={key} 
        className = "row"
        onClick={()=>{
            window.location.pathname = val.link;
        }}
        >
       <div id = "title">{val.title}</div>
        </li>
        );
        })}
        </ul>
  </div>
  );
}