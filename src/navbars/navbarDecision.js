import React, { Component } from 'react';
import styles from '../navbar.css';
import {BrowserRouter as Router,withRouter, Route, Link} from "react-router-dom";
class NavbarDecision extends Component {
    constructor(props){
        super(props);
        this.state={
            demandeCredits:[],
             clients:'',
            notations:[],
        }}


    componentDidMount() {
        const token=localStorage.getItem("token")
        fetch('https://scoring-back-heroku.herokuapp.com/clients', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("token"),
            },
        })
            .then(response => response.json())
            .then(responseJson => this.setState({clients: responseJson._embedded.clients}))
            .catch(() => {
                this.setState({message: 'erreur'})
            })
        fetch('https://scoring-back-heroku.herokuapp.com/notations', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("token"),
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                    this.setState({notations: responseJson._embedded.notations})
                    console.log(this.state.notations)
                }
            )
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
        var notations=[]
        this.state.notations.forEach(function(notation,indexN){
            notations.push(notation.notation)
        })
        var  t=[]
        var resultat=0

        var clients=this.state.clients

        notations.forEach(function(notation,indexN){
            resultat=0
            for(var index=0;clients[index];index++){
                if(clients[index].notation!=null) {
                if(new String(clients[index].notation.notation).trim()===new String(notation).trim())
                    resultat=resultat+1
                }
            }
            t.push(resultat)
        })


        return (
            <header className="public_header">
                <div className="small_top_header clearfix">
                    <ul className="links_menu">

                        <li className="active">
                            <Link to={{pathname: '/'}} className="nav-link">Plateforme Scoring</Link>
                        </li>
                        <li>
                            <Link to={{pathname: '/demandeCredit'}} className="nav-link">Prise de décision</Link>
                        </li>



                        <li>
                            <Link to={{pathname: '/historique'}} className="nav-link">Statut des décision                              utilisateurs</Link>
                        </li>
                        <li>
                            <Link to={{pathname: '/Statistiques', query: t,notations:notations}}
                                  className="nav-link">Statistiques</Link>
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

export default NavbarDecision
