import React, { Component } from 'react'
import '../formulaire.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Projet from "./Projet";
import SituationProfessionnelle from "./situationProfessionnelle";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Stepper from '../Stepper'


const document = [
    { title: 'Double-nationalité'},
    { title:  'Carte de long-séjour'} ,
    { title:   'Visa court séjour'} ,
];
const logement = [
    { title: 'Locataire '},
    { title:  'Propriétaire avec prêt encours'} ,
    { title:   'Propriétaire sans prêt encours'} ,
    { title:   'Logé par un employeur ou gratuitement'} ,
    { title:   'Autres'} ,

];
const situation = [
    { title: 'Célibataire '},
    { title:  'Marié(e)'} ,
    { title:   'Divorcé(e)'} ,
    { title:   'Veuf(ve)'} ,

];
const emprunteur = [
    { title: '1 '},
    { title:  '2'} ,

];
const documentSejour = {
    options: document,
    getOptionLabel: (option) => option.title,
};
const statutLogement = {
    options: logement,
    getOptionLabel: (option) => option.title,
};
const situationMaritale = {
    options: situation,
    getOptionLabel: (option) => option.title,
};
const nbEmprunteur = {
    options: emprunteur,
    getOptionLabel: (option) => option.title,
};
class InfoPerso2 extends Component {
    constructor(props){
        super(props);
        this.state={
            s:"",
            test:false,
            valeur:"yes",
            segments:[],
            infoClient: "",
            clients:'',
            client:"",
            data:"",
            checked: false, indeterminate: false,
            selectedDocument:"",
            selectedStatut:"",
            selectedSituation:"",
            selectedEmprunteur:""

        }
    }
    handleChange2 = event => {
        const target = event.target;
        this.setState({checked:target.checked})
        this.setState({indeterminate:target.indeterminate})
        console.log(target)
    }

    handleChange3 = event => {
        const target = event.target;
        console.log(target.id[22])
        var selected=parseInt(target.id[22])
        var option=document[selected]
        console.log(option.title)
        this.setState({selectedDocument:option.title})
    }
    handleChange4 = event => {
        const target = event.target;
        console.log(target.id)
        var selected=parseInt(target.id[22])
        var option=logement[selected]
        console.log(option.title)
        this.setState({selectedStatut:option.title})
    }
    handleChange5 = event => {
        const target = event.target;
        console.log(target.id)
        var selected=parseInt(target.id[25])
        var option=situation[selected]
        console.log(option.title)
        this.setState({selectedSituation:option.title})
    }
    handleChange6 = event => {
        const target = event.target;
        console.log(target.id)
        var selected=parseInt(target.id[20])
        var option=emprunteur[selected]
        console.log(option.title)
        this.setState({selectedEmprunteur:option.title})
    }

    handleSubmit = key => {
        const token=localStorage.getItem("token")
        fetch('http://localhost:9099/infoClients/'+key, {
            method: 'PATCH',
            body: JSON.stringify(
                {
                    documentSejour: this.state.selectedDocument,
                    adresse:this.refs["adresse"+key].value,
                    statutLogement:this.state.selectedStatut,
                    dureeLogement:this.refs["dureeLogement"+key].value,
                    nbEnfant:this.refs["nbEnfant"+key].value,
                    situationMaritale:this.state.selectedSituation,
                    nbEmprunteur:this.state.selectedEmprunteur,
                }),
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("token"),
            }
        }).then(() => {
            console.log('updated');
        })
            .catch(err => {
                console.error(err)
            });

        this.setState({test:true})

    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })


    }
    componentDidMount() {
        var client=JSON.parse(sessionStorage.getItem("client"))
        this.setState({client:JSON.parse(sessionStorage.getItem("client"))})
        this.setState({infoClient:client.infoClient})

    }

    render() {
        var required="required"
        if (this.state.test) {
            return <SituationProfessionnelle />
        } else {

            return (

                <section className="container">
                    <div className="wrapper">
                        <center><Stepper level="2" /></center>

                        <form>
                            <h1>Informations Personnelles</h1>

                            <div className="group">
                                <p>Est ce que vouz etes marocain ?
                                <Checkbox
                                    checked={this.state.checked}
                                    indeterminate={this.state.indeterminate}
                                    onChange={this.handleChange2}
                                />
                                </p>
                            </div>

                            <div className="group" hidden={this.state.checked}>
                                <Autocomplete
                                    {...documentSejour}
                                    id="documentSejour"
                                    onChange={this.handleChange3}
                                    debug
                                    name="documentSejour"
                                    renderInput={(params) => <TextField {...params} label="Qu il est le document de sejour" margin="normal" required={required}/>}
                                />
                            </div>


                            <div className="group">
                                <input id="adresse" name="adresse" type="text"
                                       onChange={this.handleChange} defaultValue={this.state.infoClient.adresse} ref={"adresse" + this.state.client.id}
                                required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Adresse</label>
                            </div>


                            <div className="group">
                                <Autocomplete
                                    {...statutLogement}
                                    id="statutLogement"
                                    onChange={this.handleChange4}
                                    debug
                                    name="statutLogement"
                                    renderInput={(params) => <TextField {...params} label="Statut du logement" margin="normal" required={required} />}
                                />
                            </div>


                            <div className="group">
                                <input  id="dureeLogement" name="dureeLogement" type="text"
                                 onChange={this.handleChange}  ref={"dureeLogement" + this.state.client.id} required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Duree Logement(En annees)</label>
                            </div>

                            <div className="group">
                                <Autocomplete
                                    {...situationMaritale}
                                    id="situationMaritale"
                                    onChange={this.handleChange5}
                                    debug
                                    name="situationMaritale"
                                    renderInput={(params) => <TextField {...params} label="Situation Maritale" margin="normal" required={required} />}
                                />
                            </div>

                            <div className="group">
                                <input  id="nbEnfant" name="nbEnfant" type="text"
                                    onChange={this.handleChange} ref={"nbEnfant" + this.state.client.id} required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Nombre d'enfant à charge</label>
                            </div>

                            <div className="group">
                                <Autocomplete
                                    {...nbEmprunteur}
                                    id="nbEmprunteur"
                                    onChange={this.handleChange6}
                                    debug
                                    name="nbEmprunteur"
                                    renderInput={(params) => <TextField {...params} label="Nombre d'emprunteur" margin="normal" required={required}/>}
                                />
                            </div>


                            <div className="btn-box">
                                <button className="btn btn-submit" type="submit"
                                        onClick={() => this.handleSubmit(this.state.infoClient.id)}>Suivant
                                </button>
                                <Link to="/infoPerso1">
                                    <button className="btn btn-cancel" type="button">Retour</button>

                                </Link>
                            </div>

                        </form>
                    </div>

                </section>


            )
        }
    }


}
export default InfoPerso2;
