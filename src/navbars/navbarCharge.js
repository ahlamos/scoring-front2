import React, { Component } from 'react';
import styles from '../navbar.css';
import {BrowserRouter as Router,withRouter, Route, Link} from "react-router-dom";
class NavbarCharge extends Component {
    constructor(props){
        super(props);
        this.state={
            clients:'',
            information:""
    }

    }

    logout() {
        localStorage.setItem("keycloak","")
        localStorage.setItem("roles","")
        this.props.keycloak.logout();
    }




    render(){

            return (
                <header className="public_header">
                    <div className="small_top_header clearfix">
                        <ul className="links_menu">

                            <li className="active">
                                <Link to={{pathname: '/'}} className="nav-link">Plateforme Scoring</Link>
                            </li>
                            <li>
                                <Link to={{pathname: '/Accueil',}} className="nav-link">Nouvelle demande de crédit</Link>
                            </li>
                            <li>
                                <Link to={{pathname: '/gererProfil'}} className="nav-link">Gestion
                                    Profil</Link>
                            </li>



                        </ul>
                        <ul className="public_lang_switcher">
                            <li className="relativePosition language_switcher">
                                <a className="public_lang_btn popin_btn"
                                   onClick={() => alert("La fonctionnalité demandée sera bientôt disponible")}>FR</a>

                            </li>
                        </ul>
                    </div>
                    <div className="public_main_head">

                        <div className="public_logo_container">
                            <h1>
                                &nbsp; <a href="/"><img src="bp_logo.png" alt="banque populaire"/></a>
                            </h1>
                        </div>
                        <div className="connect_tabs">
                            <div className="not_connected" style={{display: "none"}}>
                                <a href="/Account/Login" className="connect_link">Je me connecte</a>
                            </div>


                            <div className="connected">
                                <a onClick={ () => this.logout() } className="connect_link">Se déconnecter</a>
                            </div>
                        </div>
                    </div>
                </header>
            )




        }}

export default NavbarCharge
