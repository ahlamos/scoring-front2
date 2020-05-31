import React, { Component } from 'react'
import '../formulaire.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import serviceName from '../Shared';

import Checkbox from '@material-ui/core/Checkbox';
class Recapitulatif extends Component {
    constructor(props){
        super(props);
        this.state={
            data:"",
            revenuMensuelTotal:""




        }
    }

    componentDidMount() {
        this.setState({data:JSON.parse(sessionStorage.getItem("data"))})
        this.setState({revenuMensuelTotal:sessionStorage.getItem("revenuMensuelTotal")})
       setTimeout(()=>{
           fetch('http://localhost:9099/demandeCredits/'+sessionStorage.getItem("key"), {
               method: 'PATCH',
               body: JSON.stringify(
                   {

                       montantProjet: this.state.data.montantProjet,
                       dureeRemboursement:this.state.data.dureeRemboursement,
                       natureProjet:this.state.data.natureProjet,
                       montantMensuel:this.state.data.montantMensuel,
                       taeg:this.state.data.taeg,
                       montantTotalDu:serviceName.sharedData,
                       assurance:this.state.data.assurance,
                       tauxEndettement:this.props.tauxEndettement,
                       sommeChargeMensuelle:this.props.sommeChargeMensuelle,
                       sommeCredit:this.props.sommeCredit,
                       notation:sessionStorage.getItem("notation"),
                       revenuMensuelTotal:this.state.revenuMensuelTotal,

                   }),
               headers: {
                   "content-type": "application/json",
                   "Authorization": "Bearer "+localStorage.getItem("token")},

           }).then(response => response.json())
               .then(responseJson => this.setState({notation: responseJson}))
               .catch(err => {
                   console.error(err)
               })
       },5000)
    }



    render() {


            return (

                <div className="content">
                    <section className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="box">
                                    <div className="box-header">
                                        <h3 className="box-title">Récapitulatif:</h3>
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
                                                            <td>{this.state.data.montantProjet}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Duree Remboursement</td>
                                                            <td>{this.state.data.dureeRemboursement}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Nature Projet</td>
                                                            <td>{this.state.data.natureProjet}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Montant Mensuel</td>
                                                            <td>{this.state.data.montantMensuel}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>TAEG</td>
                                                            <td>{this.state.data.taeg}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Montant Total Du</td>
                                                            <td>{serviceName.sharedData}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Assurance</td>
                                                            <td>{this.state.data.assurance}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Taux Endettement</td>
                                                            <td>{this.props.tauxEndettement}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>revenu Mensuel Total</td>
                                                            <td>{this.state.revenuMensuelTotal}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Somme Charge Mensuelle</td>
                                                            <td>{this.props.sommeChargeMensuelle}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Somme Credit</td>
                                                            <td>{this.props.sommeCredit}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Notation</td>
                                                            <td>{this.props.notation}</td>
                                                        </tr>

                                            </tbody>
                                        </table>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </section>
                </div>







            )
        }



    }
export default Recapitulatif;
