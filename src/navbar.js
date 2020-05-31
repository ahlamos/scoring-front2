import React, { Component } from 'react';
import styles from './navbar.css';
import {BrowserRouter as Router,withRouter, Route, Link} from "react-router-dom";
import serviceName from './Shared.js';
import NavbarCharge from "./navbars/navbarCharge";
import NavbarAdmin from "./navbars/navbarAdmin";
import NavbarDirecteur from "./navbars/navbarDirecteur";
import NavbarDecision from "./navbars/navbarDecision";

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            clients:'',
    }

    }
    componentDidMount() {

    }
    logout() {

        console.log(this.props.history)
        this.props.history.push('/');
        this.props.keycloak.logout();
    }



    render(){


        var roles=[]
        roles=""
        roles=localStorage.getItem("roles").split(",")
        if(roles.indexOf("charge-instruction")!==-1){
            return <NavbarCharge keycloak={this.props.keycloak}/>
        }

        if(roles.indexOf("admin")!==-1){
            return <NavbarAdmin keycloak={this.props.keycloak}/>
        }

        if(roles.indexOf("directeur-agence")!==-1){
            return <NavbarDirecteur keycloak={this.props.keycloak}/>
        }

        if(roles.indexOf("charge-decision")!==-1){
            return <NavbarDecision keycloak={this.props.keycloak}/>
        }






        }}

export default NavBar
