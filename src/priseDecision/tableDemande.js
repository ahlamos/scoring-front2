import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Checkbox from '@material-ui/core/Checkbox';
class TableDemande extends Component {
    constructor(props){
        super(props);
        this.state={
            demandesaChercher:[],
            demandes:[],
            demandesResultat:[],
            demandeCredits:[]




        }
    }

    componentDidMount() {
            var url="";
            url="http://localhost:9099/demandeCredits";
            fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token"),
                },
            })
                .then(response => response.json())
                .then(responseJson => this.setState({
                    demandes: responseJson._embedded.demandeCredits,
                    demandesaChercher: responseJson._embedded.demandeCredits
                }))
                .catch(()=>{this.setState({ message: 'erreur'})})
        console.log(this.state.demandes)


    }


    render() {
        return (
            <div className="content">
                <section className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Liste des demandes de crédits:</h3>
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
                                            <th>Identificateur</th>
                                            <th>Date Demande</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.demandes.filter(d=>d.statut ==null).map(
                                                demande =>
                                                    <tr key={demande.identificateur}>
                                                        <td>{demande.identificateur}</td>
                                                        <td>{demande.dateDemande}</td>
                                                        <td><Link to={{pathname: '/statutDemande/'+demande.identificateur,query: {  demandeCredits: demande}}}>Modifier le statut de la demande</Link></td>
                                                    </tr>
                                            )
                                        }
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
export default TableDemande;
