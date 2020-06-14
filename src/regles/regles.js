import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

class listeRegles extends Component {
    constructor(props){
        super(props);
        this.state={
            Regles: [],
            ReglesaChercher:[],
            Conditions:[],
            name:"",
            action:"",
            conditionsNv:[]
            
        }
    }


    componentDidMount() {
        var url=""; var url2="";
        url="https://scoring-back-heroku.herokuapp.com/rules?size=200"; url2="https://scoring-back-heroku.herokuapp.com/conditionses?size=200";
        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        })
            .then(response => response.json())
            .then(responseJson => this.setState({Regles: responseJson._embedded.rules, ReglesaChercher: responseJson._embedded.rules}))
            .catch(()=>{
                this.setState({ message: 'erreur'})
            })

            fetch(url2, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer "+localStorage.getItem("token")
                },
            })
                .then(response => response.json())
                .then(responseJson => this.setState({Conditions: responseJson._embedded.conditionses}))
                .catch(()=>{
                    this.setState({ message: 'erreur'})
                })
    }


    handleChange2 = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        })   
    }

    handleChange = (event) => {
        let options = event.target.options;
        var selectedList = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            selectedList.push(JSON.parse(options[i].value));
          }
        }
        this.setState({
          conditionsNv: selectedList
        });   
    }

    handleSubmit = key => {
        fetch('https://scoring-back-heroku.herokuapp.com/rules/'+key, {
            method: 'PATCH',
            body: JSON.stringify(
            {
                name: this.refs["name"+key].value,
                action: this.refs["action"+key].value,
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
      window.location.reload();
    }


    handleSubmitForAdd = () =>{
        var url="https://scoring-back-heroku.herokuapp.com/rules/";
        fetch(url, {
            method: "POST",
            headers: {"content-type": "application/json",
            Authorization: "Bearer "+localStorage.getItem("token")},
            body: JSON.stringify({
              name: this.state.name,
              action: this.state.action,
              conditions: this.state.conditionsNv
              })
        })
        window.location.reload();
      }


    handleSubmitChercher = (event) =>{
        var updatedList = this.state.Regles;
        updatedList = updatedList.filter(function(item){
            return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
          });
          this.setState({ReglesaChercher: updatedList});
    }


    delete = (name,id) =>{
        confirmAlert({
            title: 'Confirm to delete',
            message: 'êtes-vous sûre de supprimer la règle nommée " '+name+'".',
            buttons: [
              {
                label: 'Oui',
                onClick: () => this.handleDelete(id)},
              {
                label: 'No',
                onClick: () => null
              }
            ]
          });
    }

    handleDelete = (key) =>{
        fetch('https://scoring-back-heroku.herokuapp.com/rules/'+key , {
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
        window.location.reload();
    }


render() {
    let arrayOfData = this.state.Conditions;
    let options = arrayOfData.map((data) => {
    var bool=false;
    for(var i=0;i<this.state.Regles.length;i++) {
        for(var j=0;j<this.state.Regles[i].conditions.length;j++) {
            if(data.id==this.state.Regles[i].conditions[j].id) {
            bool=true;
            break;
            }
        }
    }
    if(bool==false)  return(
        <option key={data.id} value={JSON.stringify(data)}>
        {data.property} {data.operation} {data.value}
        </option>)       
        });

    return (
        <div className="content">
        <section className="container">
                <div className="row">
                    <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Liste des Regles:</h3>
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
                                    <th>name</th>
                                    <th>action</th>
                                    <th>modifier/supprimer</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ReglesaChercher.map(
                                        dossierRente =>
                                            <tr key={dossierRente.id}>
                                                <td>{dossierRente.name}</td>
                                                <td>{dossierRente.action}</td>
                                                <td>
                                        
                                                <i className="fa fa-fw fa-edit" data-toggle="modal" data-target={"#modal-edit"+dossierRente.id}></i>
                                                <div className="modal modal-info fade" id={"modal-edit"+dossierRente.id}>
                                                    <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span></button>
                                                        <h4 className="modal-title">modifier les informations de la règle:</h4>
                                                        </div>
                                                        <div className="modal-body">
                                                        
                                                        <form onSubmit={() => this.handleSubmit(dossierRente.id)}>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                            <div className="box box-primary">
                                                                <div className="box-header with-border">
                                                                <h3 className="box-title">nom du règle</h3>
                                                                </div>
                                                                <div className="box-body">
                                                                <div className="form-group">               
                                                                    <input className="forrm-control" id="name" name="name" type="text" placeholder="Enter le nom du règle" defaultValue={dossierRente.name} ref={"name"+dossierRente.id} required/>
                                                                </div>     
                                                            </div>
                                                            </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                            <div className="box box-primary">
                                                            <div className="box-header with-border">
                                                                <h3 className="box-title">les points à ajouter</h3>
                                                            </div>
                                                            <div className="box-body">
                                                            <div className="form-group">  
                                                                <input className="forrm-control" id="action" name="action" type="number" placeholder="Entrez les nombres des points à ajouter" defaultValue={dossierRente.action} ref={"action"+dossierRente.id} required/>
                                                                </div>           
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-submit" >Modifier</button>
                                                </form>
                                                
                                            </div>

                                            <div className="modal-footer">
                                                    <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">Fermer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <i className="fa fa-fw fa-trash" onClick={() => this.delete(dossierRente.name,dossierRente.id)}></i>
                            </td>
                            <td><Link to={{pathname: '/conditions/'+dossierRente.id,state: {  Conditions: dossierRente.conditions}}}>Liste des conditions de cette règle</Link></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        <div className="box-footer">
            <button className="btn btn-submit" data-toggle="modal" data-target={"#modal-add"}>Nouvelle règle</button>

            <div className="modal modal-info fade" id={"modal-add"}>
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Ajouter nouvelle règle:</h4>
                    </div>
                    <div className="modal-body">
                    
                    <form onSubmit={this.handleSubmitForAdd}>
                    <div className="row">
                        <div className="col-md-6">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                            <h3 className="box-title">nom du règle</h3>
                            </div>
                            <div className="box-body">
                            <div className="form-group">               
                                <input className="forrm-control" name="name" type="text" placeholder="Enter le nom du règle"  onChange={this.handleChange2} required/>
                            </div>           
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">les points à ajouter</h3>
                        </div>
                        <div className="box-body">
                        <div className="form-group">  
                            <input className="forrm-control" name="action" type="number" placeholder="Entrez les nombres des points à ajouter" onChange={this.handleChange2} required/>
                            </div>           
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="box box-primary">
                            <div className="box-header with-border">
                            <h3 className="box-title">les conditions</h3>
                            </div>
                            <div className="box-body">
                            <div className="form-group">
                                <select multiple name="conditionsNv" className="forrm-control" onChange={this.handleChange} required>
                                        {options}
                                </select>
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
export default listeRegles
