import React, { Component } from 'react';
import styles from './navbar.css';
import {BrowserRouter as Router,withRouter, Route, Link} from "react-router-dom";

class PageAccueil extends Component {
    constructor(props){
        super(props);
        this.state={
            test:""

        }


    }
    componentWillMount() {

    }

    onSubmit =(e)=> {
        e.preventDefault();

    }

    render(){

        return (

            <div>
                <section className="block_poket">
                    <div className="pocket_left">
                        <h3 className="">Espace {localStorage.getItem("roles")}</h3><br/>
                        <img src={require('./images/PlateformeScoring.png')} alt="" />

                    </div>
                    <div className="pocket_right">
                        <h3 className="">Bienvenue à la plateforme de notation</h3>
                        <h4 className="">
                            L’application web pour gérer les clients et leurs demandes de notation
                        </h4>

                        <p>
                            <b>La plateforme de scoring est la nouvelle méthode pour gérer le Scoring dans la Banque Centrale Populaire</b> <br />
                            C’est une plateforme qui se base sur l’analyse des informations connues sur un client à et saisies à travers des formulaires ainsi que sur des règles de gestion pour donner une notation finale représentant la probabilité du risque encouru en octroyant un crédit ou un service à ce client.
                        </p>
                        <p className="mobile_download_btns">
                            <button onClick={this.openn}>fff </button>
                        </p>
                    </div>
                </section>



                <section className="espace_front_deco">
                    <p className="espace_front_deco_icon align_center">
                        <img src={require('./images/espace_front_deco_icn@2x.png')} width="80" alt="Alternate Text" />
                    </p>
                    <p className="mobile_download_btns align_center">

                    </p>
                </section>
            </div>

        );
    }


}

export default PageAccueil
