import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

class listeClients extends Component {
    constructor(props){
        super(props);
        this.state={
            Clients: [],
            ClientsaChercher: [],
        }
    }
    componentDidMount() {
            var url="";
            url="https://scoring-back-heroku.herokuapp.com/clients";
            fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer "+localStorage.getItem("token")
                },
            })
                .then(response => response.json())
                .then(responseJson => this.setState({
                    Clients: responseJson._embedded.clients,
                    ClientsaChercher: responseJson._embedded.clients
                }))
                .catch(()=>{this.setState({ message: 'erreur'})})
    }

    handleSubmitChercher = (event) =>{
        var updatedList = this.state.Clients;
        updatedList = updatedList.filter(function(item){
            return item.CIN.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
            item.nom.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
          this.setState({ClientsaChercher: updatedList});
    }

    handleSubmit = id => {
        fetch('https://scoring-back-heroku.herokuapp.com/majClient/'+id, {
            method: 'PATCH',
            body: JSON.stringify(
                {   
                email:this.refs["email"+id].value,
                telephone:this.refs["telephone"+id].value,
                dateNaissance:this.refs["dateNaissance"+id].value,
                cin:this.refs["cin"+id].value,
                civilite:this.refs["civilite"+id].value,
                nom:this.refs["nom"+id].value,
                adresse:this.refs["adresse"+id].value,

                }),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        })
        alert("la mise à jour a été faite avec succès")
    }

    delete = (name,id) =>{
        confirmAlert({
            title: 'Confirm to delete',
            message: 'êtes-vous sûre de supprimer le client '+name,
            buttons: [{label: 'Oui',onClick: () => this.handleDelete(id)},{label: 'No',onClick: () => null}]
          });
    }


    handleDelete = (key) =>{
        fetch('https://scoring-back-heroku.herokuapp.com/clients/'+key , {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        }).then(() => {
                console.log('removed');})
          .catch(err => {
                console.error(err)
        });
        alert("le client a été supprimé !");
        window.location.reload();
    }

    addClient = () => {
        fetch('https://scoring-back-heroku.herokuapp.com/ajouterClient' , {
            method: "POST",
            body: JSON.stringify(
                {
                    email:this.refs["email"].value,
                    telephone:this.refs["telephone"].value,
                    dateNaissance:this.refs["dateNaissance"].value,
                    cin:this.refs["cin"].value,
                    civilite:this.refs["civilite"].value,
                    nom:this.refs["nom"].value,
                    adresse:this.refs["adresse"].value,

                }),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        }).then(() => {
            console.log('removed');})
            .catch(err => {
                console.error(err)
            });

        alert("utilisateur ajouté");
        window.location.reload();


    }


    render() {
    return ( 
        <div className="content">
        <section className="container">
                <div className="row">
                    <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Liste des clients:</h3>
                            <div className="box-tools">
                                <div className="input-group input-group-sm hidden-xs" style={{width: "150px"}} >
                                    <input type="text" className="forrm-control pull-right" placeholder="Chercher par CIN, nom, prenom" onChange={this.handleSubmitChercher}/>
                                </div>
                            </div>
                        </div>
                        <div className="box-body table-responsive no-padding">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nom complèt</th>
                                    <th>CIN</th>
                                    <th>dateNaissance</th>
                                    <th>Email</th>
                                    <th>Téléphone</th>
                                    <th>Notation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ClientsaChercher.map(
                                        client =>
                                            <tr key={client.id}>
                                                <td>{client.nom}</td>
                                                <td>{client.cin}</td>
                                                <td>{client.dateNaissance}</td>
                                                <td>{client.email}</td>
                                                <td>{client.telephone}</td>
                                                <td>{client.notation==null?"":client.notation.notation}</td>
                                                <td>
                                                    <i className="fa fa-fw fa-edit" data-toggle="modal" data-target={"#modal-edit"+client.id}></i>


                                                    <div className="modal modal-info fade" id={"modal-edit"+client.id}>
                                                    <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span></button>
                                                        <h4 className="modal-title">modifier les informations du client:</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                    <form onSubmit={() => this.handleSubmit(client.id)}>
                                                        <h1>Modifier le Client</h1>
                                                        <div className="group">
                                                            <input  id="cin" name="cin" type="text" ref={"cin"+client.id} defaultValue={client.cin} required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">CIN</label>
                                                        </div>
                                                        <div className="group">
                                                            <input  id="civilite" name="civilite" type="text" ref={"civilite"+client.id} defaultValue={client.civilite} required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Civilité</label>
                                                        </div>
                                                        <div className="group">
                                                            <input  id="nom" name="nom" type="text" ref={"nom"+client.id} defaultValue={client.nom} required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Nom</label>
                                                        </div>
                                                        <div className="group">
                                                            <input  id="dateNaissance" name="dateNaissance" type="texte" ref={"dateNaissance"+client.id} defaultValue={client.dateNaissance} required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Date De Naissance</label>
                                                        </div>
                                                        <div className="group">
                                                            <input  id="email" name="email" type="text" ref={"email"+client.id} defaultValue={client.email} required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Email</label>
                                                        </div>
                                                        <div className="group">
                                                            <input  id="telephone" name="telephone" type="number" ref={"telephone"+client.id} defaultValue={client.telephone} required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Telephone</label>
                                                        </div>
                                                        <div className="group">
                                                            <input  id="adresse" name="adresse" type="text"  ref={"adresse"+client.id} defaultValue={client.infoClient.adresse} required />
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="adresse">Adresse</label>
                                                        </div>

                                                        <div className="btn-box">
                                                            <button className="btn btn-submit" type="submit">Modifier</button>
                                                        </div>
                                              </form>
                                            </div>
                                            <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">Fermer</button>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            <i className="fa fa-fw fa-trash" onClick={() => this.delete(client.nom,client.id)}></i>
                                                </td>                 
                                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

                        <div className="box-footer">
                            <button className="btn btn-submit" data-toggle="modal" data-target={"#modal-add"}>Nouveau Client</button>

                            <div className="modal modal-info fade" id={"modal-add"}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span></button>
                                            <h4 className="modal-title">Ajouter un client:</h4>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={() => this.addClient()}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="group">
                                                            <input className="forrm-control" id="cin" name="cin" type="text" ref={"cin"}  required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">CIN</label>
                                                        </div>
                                                        <div className="group">
                                                            <input className="forrm-control" id="civilite" name="civilite" type="text" ref={"civilite"}  required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Civilité</label>
                                                        </div>
                                                        <div className="group">
                                                            <input className="forrm-control" id="nom" name="nom" type="text" ref={"nom"}  required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Nom</label>
                                                        </div>
                                                        <div className="group">
                                                            <input className="forrm-control" id="dateNaissance" name="dateNaissance" type="texte" ref={"dateNaissance"}  required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Date De Naissance</label>
                                                        </div>
                                                        <div className="group">
                                                            <input className="forrm-control" id="email" name="email" type="text" ref={"email"} required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Email</label>
                                                        </div>
                                                        <div className="group">
                                                            <input className="forrm-control" id="telephone" name="telephone" type="number" ref={"telephone"}  required/>
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="cin">Telephone</label>
                                                        </div>
                                                        <div className="group">
                                                            <input className="forrm-control" id="adresse" name="adresse" type="text"  ref={"adresse"}  required />
                                                            <span className="highlight"></span><span
                                                            className="bar"></span>
                                                            <label htmlFor="adresse">Adresse</label>
                                                        </div>
                                                    </div>

                                                </div>
                                                <button className="btn btn-submit">Ajouter</button>
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
    );
}
}
export default listeClients
