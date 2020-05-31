import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

class listeConditions extends Component {
    constructor(props){
        super(props);
        this.state={
            Conditions: [],
            ConditionsaChercher: [],
            value:"",
            property:"",
            operation:"Greater than"
        }
    }

    componentDidMount() {
        if(this.props.location.state===undefined) {
            var url="";
            url="https://scoring-back-heroku.herokuapp.com/conditionses";
            fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("token"),
                },
            })
                .then(response => response.json())
                .then(responseJson => this.setState({
                    Conditions: responseJson._embedded.conditionses,
                    ConditionsaChercher: responseJson._embedded.conditionses
                }))
                .catch(()=>{this.setState({ message: 'erreur'})})
            }
            else {
                const { Conditions } = this.props.location.state;
                this.setState({Conditions: Conditions, ConditionsaChercher:Conditions})
            }
    }
    handleChange = event => {
        console.log("name= "+event.target.name);
        console.log("value= "+event.target.value);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        })   
    }

    handleSubmitForAdd = () =>{
        var url="https://scoring-back-heroku.herokuapp.com/conditionses/";
        fetch(url, {
            method: "POST",
            headers: {"content-type": "application/json",
            Authorization: "Bearer "+localStorage.getItem("token")},
            body: JSON.stringify({
              property: this.state.property,
              value: this.state.value,
              operation: this.state.operation
              })
        })
        alert("la condition a été ajoutée avec succès")
        window.location.reload();
      }

    handleSubmit = key => {
        fetch('https://scoring-back-heroku.herokuapp.com/'+key, {
            method: 'PATCH',
            body: JSON.stringify(
            {
                operation: this.refs["operation"+key].value,
                property: this.refs["property"+key].value,
                value: this.refs["value"+key].value
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        }).then(() => {
                 console.log('updated');})
        .catch(err => {
                console.error(err)
        });
      alert("Les données sont modifiées, Merci !");
      window.location.reload();
    }

    handleSubmitChercher = (event) =>{
        var updatedList = this.state.Conditions;
        updatedList = updatedList.filter(function(item){
            return item.operation.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
            item.property.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
            item.value.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
          this.setState({ConditionsaChercher: updatedList});
    }

    delete = (id) =>{
        confirmAlert({
            title: 'Confirm to delete',
            message: 'êtes-vous sûre de supprimer cette condition',
            buttons: [{label: 'Oui',onClick: () => this.handleDelete(id)},{label: 'No',onClick: () => null}]
          });
    }


    handleDelete = (key) =>{
        fetch('https://scoring-back-heroku.herokuapp.com/'+key , {
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
        alert("la condition a été supprimée !");
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
                            <h3 className="box-title">Liste des Conditions:</h3>
                            <div className="box-tools">
                                <div className="input-group input-group-sm hidden-xs" style={{width: "150px"}} >
                                    <input type="text" className="forrm-control pull-right" placeholder="Chercher par operateur, valeur ou attribut" onChange={this.handleSubmitChercher}/>
                                </div>
                            </div>
                        </div>
                        <div className="box-body table-responsive no-padding">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>operateur de comparaison</th>
                                    <th>Valeur à comparer</th>
                                    <th>Attribut du client à comparer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ConditionsaChercher.map(
                                        dossierRente =>
                                            <tr key={dossierRente.id}>
                                                <td>{dossierRente.operation}</td>
                                                <td>{dossierRente.value}</td>
                                                <td>{dossierRente.property}</td>
                                                <td>
                                                <i className="fa fa-fw fa-edit" data-toggle="modal" data-target={"#modal-edit"+dossierRente.id}></i>
                                                <div className="modal modal-info fade" id={"modal-edit"+dossierRente.id}>
                                                    <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span></button>
                                                        <h4 className="modal-title">modifier les informations de la condition:</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                    <form onSubmit={() => this.handleSubmit(dossierRente.id)}>
                                                        <div className="row">
                                                            <div className="box box-primary">
                                                                <div className="box-header with-border">
                                                                <h3 className="box-title">operateur de comparaison</h3>
                                                                </div>
                                                                <div className="box-body">
                                                                <div className="form-group">               
                                                                    <select className="forrm-control" name="operation" defaultValue={dossierRente.operation} ref={"operation"+dossierRente.id} required>
                                                                        <option value="Greater than">Supérieur à</option>
                                                                        <option value="Less than">Inférieur à</option>
                                                                        <option value="Greater or equal to">Supérieur ou égal à</option>
                                                                        <option value="Less or equal to">Inférieur ou égal à</option>
                                                                        <option value="Not equal to">Pas égal à</option>
                                                                        <option value="Equal to">Egal à</option>
                                                                        <option value="Contains this">Contient</option>
                                                                    </select>
                                                                </div>           
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="box box-primary">
                                                                <div className="box-header with-border">
                                                                    <h3 className="box-title">l'attribut à comparer</h3>
                                                                </div>
                                                                <div className="box-body">
                                                                <div className="form-group">  
                                                                    <input className="forrm-control" id="property" name="property" type="text" placeholder="Entrez l'attribut à comparer" defaultValue={dossierRente.property} ref={"property"+dossierRente.id} required/>
                                                                </div>              
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="box box-primary">
                                                                <div className="box-header with-border">
                                                                    <h3 className="box-title">la valeur  à comparer</h3>
                                                                </div>
                                                                <div className="box-body">
                                                                    <div className="form-group">  
                                                                    <input className="forrm-control" id="value" name="value" type="text" placeholder="Entrez la valeur avec laquelle on compare" defaultValue={dossierRente.value} ref={"value"+dossierRente.id} required/>
                                                                    </div>            
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-submit">Sauvegarder</button>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">Fermer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <i className="fa fa-fw fa-trash" onClick={() => this.delete(dossierRente.id)}></i>
                            </td>
                            
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        <div className="box-footer">
            <button className="btn btn-submit" data-toggle="modal" data-target={"#modal-add"}>Nouvelle Condition</button>

            <div className="modal modal-info fade" id={"modal-add"}>
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Ajouter nouvelle condition:</h4>
                    </div>
                    <div className="modal-body">
                <form onSubmit={this.handleSubmitForAdd}>
                    <div className="row">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                            <h3 className="box-title">operateur de comparaison</h3>
                            </div>
                            <div className="box-body">
                            <div className="form-group">                   
                                <select className="forrm-control" name="operation" onChange={this.handleChange} required>
                                    <option value="Greater than">Supérieur à</option>
                                    <option value="Less than">Inférieur à</option>
                                    <option value="Greater or equal to">Supérieur ou égal à</option>
                                    <option value="Less or equal to">Inférieur ou égal à</option>
                                    <option value="Not equal to">Pas égal à</option>
                                    <option value="Equal to">Egal à</option>
                                    <option value="Contains this">Contient</option>
                                </select>
                            </div>           
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">l'attribut à comparer</h3>
                            </div>
                            <div className="box-body">
                            <div className="form-group">  
                                <input className="forrm-control" id="property" name="property" type="text" placeholder="Entrez l'attribut à comparer" onChange={this.handleChange} required />
                            </div>              
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">la valeur  à comparer</h3>
                            </div>
                            <div className="box-body">
                                <div className="form-group">  
                                <input className="forrm-control" id="value" name="value" type="text" placeholder="Entrez la valeur avec laquelle on compare" onChange={this.handleChange} required/>
                                </div>            
                            </div>
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
export default listeConditions
