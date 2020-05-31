import React, { Component } from 'react';
import styles from '../navbar.css';
import {BrowserRouter as Router,withRouter, Link} from "react-router-dom";
class NavbarAdmin extends Component {
    constructor(props){
        super(props);
        this.state={
            clients:'',
            data:[{
                user:"",roles:[],
            }],
            redirecion:false
    }}

    componentDidMount() {
        const token = localStorage.getItem("token")
        fetch('http://localhost:9098/auth/admin/realms/plateforme-scoring/roles', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(response => response.json())
            .then(responseJson =>this.setState({roles: responseJson}))

            .catch(() => {
                this.setState({message: 'erreur'})
            })
    }

        logout() {
        localStorage.setItem("keycloak","");
        localStorage.setItem("roles","");
        this.props.keycloak.logout();
        }

    render(){
             sessionStorage.setItem("role-mappings",JSON.stringify(this.state.roles))
             return (
                <header className="public_header">
                <div className="small_top_header clearfix">
                    <ul className="links_menu">

                        <li className="active">
                            <Link to={{pathname: '/'}} className="nav-link">Plateforme Scoring</Link>
                        </li>
                        <li>
                            <Link to={{pathname: '/segments'}} className="nav-link">Gestion des segments</Link>
                        </li>


                        <li className="relativePosition links">
                            <a href="" className="links_btn">Gestion des règles et conditions</a>
                            <ul className="link_list">

                                <li>
                                    <a href="/regles" target="_blank">
                                        <Link to={{pathname: '/regles'}} className="nav-link">Gestion des
                                            règles</Link>
                                    </a>
                                </li>
                                <li>
                                    <Link to={{pathname: '/conditions'}} className="nav-link">Gestion des
                                        conditions</Link>
                                </li>
                            </ul>
                        </li>


                        <li>
                            <Link to={{pathname: '/gestionUser' ,query:this.state.roles}} className="nav-link">Gestion des
                                utilisateurs</Link>
                        </li>

                        <li>
                            <Link to={{pathname: '/gererProfil' }} className="nav-link">Gestion
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

export default NavbarAdmin
