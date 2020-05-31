import React, { Component } from 'react'
import '../formulaire.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Checkbox from '@material-ui/core/Checkbox';
import HistoriqueDemande from "./historiqueDemande";
import InfoPerso from "../InfoClients/InfoPerso";
import TableDemande from "./tableDemande";
class StatutDemande extends Component {
    constructor(props){
        super(props);
        this.state={
            informations:[],
            informationsaChercher:[],
            statut:false




        }
    }

    componentDidMount() {
        const { demandeCredits } = this.props.location.query;
        this.setState({informations: demandeCredits, informationsaChercher:demandeCredits})
    }

    handleAccept = (key) =>{
        fetch('http://localhost:9099/updateStatut/'+key , {
            method: "PATCH",
            body: "ACCEPTE",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        }).then(() => {
           })
            .catch(err => {
                console.error(err)
            });
        this.setState({statut:true})



    }
    handleRejet = (key) =>{
        console.log("ksdkb;k")
        fetch('http://localhost:9099/updateStatut/'+key , {
            method: "PATCH",
            body: "REJETTE",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        }).then(() => {
        })
            .catch(err => {
                console.error(err)
            });

        this.setState({statut:true})

    }


    render() {
        var dataAccept=[this.state.informations.identificateur,this.state.informations.dateDemande,"ACCEPTE"]
        var dataRejet=[this.state.informations.identificateur,this.state.informations.dateDemande,"REJETE"]

        if(this.state.statut){
            return <TableDemande/>
        }
        else

        return (

            <div className="content">
                <section className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Informations de la demande:</h3>
                                    <div className="box-tools">
                                        <div className="input-group input-group-sm hidden-xs" style={{width: "150px"}} >
                                            <input type="text" className="forrm-control pull-right" placeholder="Chercher" onChange={this.handleSubmitChercher} />
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body table-responsive no-padding">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Information</th>
                                            <th>Valeur</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr>
                                            <td>Montant Projet</td>
                                            <td>{this.state.informations.montantProjet}</td>
                                        </tr>
                                        <tr>
                                            <td>Duree Remboursement</td>
                                            <td>{this.state.informations.dureeRemboursement}</td>
                                        </tr>
                                        <tr>
                                            <td>Nature Projet</td>
                                            <td>{this.state.informations.natureProjet}</td>
                                        </tr>
                                        <tr>
                                            <td>Montant Mensuel</td>
                                            <td>{this.state.informations.montantMensuel}</td>
                                        </tr>
                                        <tr>
                                            <td>TAEG</td>
                                            <td>{this.state.informations.taeg}</td>
                                        </tr>
                                        <tr>
                                            <td>Montant Total Du</td>
                                            <td>{this.state.informations.montantTotalDu}</td>
                                        </tr>
                                        <tr>
                                            <td>Assurance</td>
                                            <td>{this.state.informations.assurance}</td>
                                        </tr>
                                        <tr>
                                            <td>Taux Endettement</td>
                                            <td>{this.state.informations.tauxEndettement}</td>
                                        </tr>
                                        <tr>
                                            <td>revenu Mensuel Total</td>
                                            <td>{this.state.informations.revenuMensuelTotal}</td>
                                        </tr>
                                        <tr>
                                            <td>Somme Charge Mensuelle</td>
                                            <td>{this.state.informations.sommeChargeMensuelle}</td>
                                        </tr>
                                        <tr>
                                            <td>Somme Credit</td>
                                            <td>{this.state.informations.sommeCredit}</td>
                                        </tr>
                                        <tr>
                                            <td>Notation</td>
                                            <td>{this.state.informations.notation}</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>

                                <div className="box-footer">
                                    <button className="btn btn-submit" data-toggle="modal" data-target={"#modal-add1"}>Accepter</button>

                                    <div className="modal modal-info fade" id={"modal-add1"}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span></button>
                                                    <h4 className="modal-title">Accepter La Demande</h4>
                                                </div>
                                                <div className="modal-body">

                                                    <form onSubmit={() => this.handleAccept(this.state.informations.identificateur)}>
                                                        <div>
                                                            <h3>Etes vous sur d'accepter la demande de crédit</h3>
                                                        </div>
                                                        <br/>

                                                        <button className="btn btn-submit">Accepter</button>
                                                    </form>

                                                </div>

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline pull-left" data-dismiss="modal" >Fermer</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                        <button className="btn btn-submit" data-toggle="modal" data-target={"#modal-add2"}>Rejetter</button>

                                        <div className="modal modal-info fade" id={"modal-add2"}>
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span></button>
                                                        <h4 className="modal-title">Rejetter la demande</h4>
                                                    </div>
                                                    <div className="modal-body">

                                                        <form onSubmit={() => this.handleRejet(this.state.informations.identificateur)}>
                                                            <div className="group">
                                                                <textarea type="textarea" rows="5"
                                                                          required="required"></textarea><span
                                                                className="highlight"></span><span
                                                                className="bar"></span>
                                                                <label>Motif de rejet</label>
                                                            </div>

                                                            <button className="btn btn-submit">Rejetter</button>
                                                        </form>

                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">Fermer</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                            </div>
                        </div>
                    </div>
                </section>
            </div>







        )
    }



}
export default StatutDemande;
