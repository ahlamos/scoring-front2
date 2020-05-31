
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Checkbox from '@material-ui/core/Checkbox';

class HistoriqueDemande extends Component {
    constructor(props){
        super(props);
        this.state={
            demandesaChercher:[],
            historiqueDemandes:[],
            color:''
        }
    }

    componentDidMount() {
        var url="";
        url="https://scoring-back-heroku.herokuapp.com/demandeCredits";
        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("token"),
            },
        })
            .then(response => response.json())
            .then(responseJson => this.setState({
                historiqueDemandes: responseJson._embedded.demandeCredits
            }))
            .catch(()=>{this.setState({ message: 'erreur'})})
    }

    handleColor = (key) =>{
       return 'red'
    }

    render() {
        return (
            <div className="content">
                <section className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Liste des demandes traités:</h3>
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
                                            <th>Statut</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.historiqueDemandes.filter(d=>d.statut !=null).map(
                                                demande =>
                                                    <tr key={demande.identificateur}>
                                                        <td>{demande.identificateur}</td>
                                                        <td>{demande.dateDemande}</td>
                                                        <td style={{color:demande.statut=='ACCEPTE' ?'green':'red'}}>{demande.statut}</td>
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
export default HistoriqueDemande;
