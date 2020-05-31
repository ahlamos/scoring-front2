import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import UserInfo from '../UserInfo';
import Logout from '../Logout';
import Accueil from "../Accueil";
import Statistiques from "../statistiques/Statistiques";
import Projet from "../InfoClients/Projet";
import NavBar from "../navbar";
import AjoutSegment from "../segments/Segments";
import listeClients from "../notations/ClientNot";
import Routage from "../Routage"
import NavbarAdmin from "../navbars/navbarAdmin";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PageAccueil from "../PageAccueil"
import NavbarDirecteur from "../navbars/navbarDirecteur";
const keycloak = Keycloak('/keycloak.json');
class Secured extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false,history:null,username: "",roles:""};
    }

    componentDidMount() {
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            localStorage.setItem("keycloak",JSON.stringify(keycloak))
            localStorage.setItem("token",keycloak.token)
            localStorage.setItem("id",keycloak.subject)

            this.setState({ keycloak: keycloak, authenticated: authenticated,roles:keycloak.realmAccess.roles })

        })

    }

    render() {
        if(this.state.keycloak) {
            if(this.state.authenticated){
                localStorage.setItem("roles","")
                localStorage.setItem("roles",keycloak.realmAccess.roles);
                    return (
                        <div>
                            <Routage keycloak={this.state.keycloak}/>
                        </div>
                    )
                }



            else return (<div>Unable to authenticate!</div>)
        }
        return (
            <div>Initializing Keycloak...</div>
        );
    }
}
export default Secured
