import React, { Component } from 'react'

import Rechercher from './InfoClients/Projet'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Accueil from "./Accueil";
import InfoPerso2 from "./InfoClients/InfoPerso2";
import Statistiques from "./statistiques/Statistiques";
import NavBar from './navbar';
import listeRegles from './regles/regles'
import listeConditions from './conditions/Conditions';
import AjoutSegment from './segments/Segments';
import listeClients from './notations/ClientNot'
import AjouterClient from './addClient'
import Secured from "./securite/Secured"
import NavbarCharge from "./navbars/navbarCharge";
import NavbarAdmin from "./navbars/navbarAdmin";
import NavbarDirecteur from "./navbars/navbarDirecteur";
import PageAccueil from "./PageAccueil";
import Keycloak from "keycloak-js";
import serviceName from './Shared.js';
import Logout from "./Logout";
import GestionUser from "./gestionUser/tableUser"
import TableDemande from "./priseDecision/tableDemande"
import HistoriqueDemande from "./priseDecision/historiqueDemande"
import StatutDemande from "./priseDecision/StatutDemande"
import Statut from "./priseDecision/statut"
import InfoPerso1 from "./InfoClients/InfoPerso";
import ChargeMensuel from "./InfoClients/ChargeMensuel";
import SituationProfessionnelle from "./InfoClients/situationProfessionnelle";
import SituationFinanciere from "./InfoClients/SituationFinanciere";
import Recapitulatif from "./InfoClients/Recapitulatif";
import Projet from "./InfoClients/Projet";
import GererProfil from "./profil/GererProfil";

class Rouatge extends Component {
    constructor(props){
        super(props);
        this.state={
            roles:""

        }
    }


    render(){
        const code = serviceName.sharedData;
            return (
                <Router>
                    <NavBar keycloak={this.props.keycloak}/>
                    <br /><br /><br /><br /><br /><br /><br />
                    <section className="wrapper_content">
                        <div className="dashboardarea">
                            <Route exact path="/" component={PageAccueil} />
                            <Route path="/Accueil" component={Accueil} />
                            <Route path="/Rechercher" component={Rechercher} />
                            <Route path="/InfoV" component={InfoPerso2} />
                            <Route path="/Statistiques" component={Statistiques} />
                            <Route path="/regles" component={listeRegles} />
                            <Route path="/conditions" component={listeConditions} />
                            <Route path="/segments" component={AjoutSegment} />
                            <Route path="/clients" component={listeClients} />
                            <Route path="/ajoutClient" component={AjouterClient} />
                            <Route path="/Logout" component={Logout} />
                            <Route path="/gestionUser" component={GestionUser} />
                            <Route path="/demandeCredit" component={TableDemande} />
                            <Route path="/historique" component={HistoriqueDemande} />
                            <Route path="/updateStatut" component={GestionUser} />
                            <Route path="/statutDemande" component={StatutDemande} />
                            <Route path="/statut" component={Statut} />
                            <Route path="/infoPerso1" component={InfoPerso1} />
                            <Route path="/infoPerso2" component={InfoPerso2} />
                            <Route path="/chargeMensuelle" component={ChargeMensuel} />
                            <Route path="/situationProfessionnelle" component={SituationProfessionnelle} />
                            <Route path="/situationFinanciere" component={SituationFinanciere} />
                            <Route path="/recapitulatif" component={Recapitulatif} />
                            <Route path="/projet" component={Projet} />
                            <Route path="/gererProfil" component={GererProfil} />


                        </div>
                    </section>
                </Router>
            );


    }
}

export default Rouatge;
