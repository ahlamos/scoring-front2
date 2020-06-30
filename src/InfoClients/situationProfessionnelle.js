import React, { Component } from 'react'
import '../formulaire.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Projet from "./Projet";
import SituationFinanciere from './SituationFinanciere'
import InfoPerso from "./InfoPerso";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Stepper from '../Stepper'
const statut = [
    { title: 'Salarié du privé'},
    { title:  'Salarié du public'} ,
    { title:   'Indépendant'} ,
    { title:   'Retraité'} ,

];
const contrat = [
    { title: 'CDI'},
    { title:  'CDD'} ,
    { title:   'Intérim'} ,
    { title:   'Contrat d’apprentissage'} ,

];
const classification = [
    { title: 'Contrat Cadre'},
    { title:  'Contrat non-Cadre'} ,
];

const statutProfesionnel = {
    options: statut,
    getOptionLabel: (option) => option.title,
};
const typeContrat = {
    options: contrat,
    getOptionLabel: (option) => option.title,
};
const Classification = {
    options: classification,
    getOptionLabel: (option) => option.title,
};

class SituationProfessionnelle extends Component {
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
            selectedContrat:"",
            selectedClassification:"",
            hidden:true,
            hiddenContart:true
        }
    }
    handleChange1 = event => {
        const target = event.target;
        console.log(target.id)
        var selected=parseInt(target.id[26])
        var option=statut[selected]
        this.setState({hiddenContart:false})
        if(option.title === "Indépendant" || option.title === "Retraité"){
            this.setState({hiddenContart:true})
            this.setState({hidden:true})
        }
        console.log(option.title)
        this.setState({selectedStatut:option.title})
    }
    handleChange2 = event => {
        const target = event.target;
        console.log(target.id)
        var selected=parseInt(target.id[19])
        var option=contrat[selected]
        this.setState({hidden:true})
        if(option.title === "CDI" || option.title === "CDD"){
            this.setState({hidden:false})
        }
        this.setState({selectedContrat:option.title})
    }
    handleChange3 = event => {
        const target = event.target;
        console.log(target.id)
        var selected=parseInt(target.id[22])
        var option=classification[selected]
        console.log(option.title)
        this.setState({selectedClassification:option.title})
    }



    handleSubmit = key => {
        const token=localStorage.getItem("token")
        var duree=this.refs["dureeContrat"+key].value
        var duree1=duree.split('/')
        var mois=parseInt(duree1[0])
        var ans=parseInt(duree1[1])
        var date=new Date()
        var resultat= (date.getFullYear()-ans)*12 + (date.getMonth()+1-mois)
        fetch('https://scoring-back-heroku.herokuapp.com/infoClients/'+key, {
            method: 'PATCH',
            body: JSON.stringify(
                {
                    statutProfesionnel:this.state.selectedStatut,
                    classification : this.state.selectedClassification,
                    typeContrat:this.state.selectedContrat,
                    dureeContrat:resultat
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
        if(this.state.test){
            return <SituationFinanciere />
        }
        else {


            return (

                <section className="container">
                    <div className="wrapper">
                        <center><Stepper level="3" /></center>

                        <form onSubmit={() => this.handleSubmit(this.state.infoClient.id)}>
                            <h1>Situation Professionelle</h1>

                            <div className="group" >
                                <Autocomplete
                                    {...statutProfesionnel}
                                    id="statutProfesionnel"
                                    onChange={this.handleChange1}
                                    debug
                                    name="statutProfesionnel"
                                    renderInput={(params) => <TextField {...params} label="Statut Profesionnel" margin="normal"
                                    required={required}/>}
                                />
                            </div>

                            <div className="group" hidden={this.state.hiddenContart}>
                                <Autocomplete
                                    {...typeContrat}
                                    id="typeContrat"
                                    onChange={this.handleChange2}
                                    debug
                                    name="typeContrat"
                                    renderInput={(params) => <TextField {...params} label="Type de contrat" margin="normal"
                                  
                                />
                            </div>

                            <div className="group" hidden={this.state.hidden}>
                                <Autocomplete
                                    {...Classification}
                                    id="classification"
                                    onChange={this.handleChange3}
                                    debug
                                    name="classification"
                                    renderInput={(params) => <TextField {...params} label="Classification" margin="normal"
                                
                                />
                            </div>



                            <div className="group">
                                <input  id="dureeContrat" name="dureeContrat" type="text"
                                       onChange={this.handleChange}  ref={"dureeContrat" + this.state.client.id}
                                required={required}/>
                                <span className="highlight"></span><span
                                className="bar"></span>
                                <label htmlFor="cin">Duree Contrat ("MM/AAAA")</label>
                            </div>


                            <div className="btn-box">
                                <button className="btn btn-submit" type="submit">Suivant
                                </button>
                                <Link to="/infoPerso2">
                                    <button className="btn btn-cancel" type="button">Retour</button>

                                </Link>
                            </div>

                        </form>
                    </div>

                </section>


            )
        }



}}
export default SituationProfessionnelle;
