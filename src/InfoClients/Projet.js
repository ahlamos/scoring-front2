import React, { Component } from 'react'
import '../formulaire.css';
import { Steps } from 'antd';
import InfoPerso from "./InfoPerso";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import NavbarCharge from "../navbars/navbarCharge";
import {Link} from "react-router-dom";
import serviceName from '../Shared';
import Stepper from '../Stepper'
import Accueil from "../Accueil";
const { Step } = Steps;
const projets = [
    { title: 'Auto'},
    { title:     'Immobilier'} ,
    { title:     'Travaux'} ,
    { title:     'Divers'},


];
const natureProjet = {
    options: projets,
    getOptionLabel: (option) => option.title,
};
const style={
    margin : "0px"
}
const abc="avez vous une assurance "
class Projet extends Component {
    constructor(props){
        super(props);
        this.state={
            client: "",
            test:false,
            projet:"",
            infoClient:"",
            checked: false, indeterminate: false,
            selectedValue:"",
            clients:"",
            chartData:{},
            data:[],
            tableau:[],
            montantTotalDu:0,
            donnees:'',
            incorrect:false


        }
    }
    handleGameClik() {
        this.setState( {disabled: !this.state.disabled} )
    }

    componentDidMount() {

        var url = "";
        url = "https://scoring-back-heroku.herokuapp.com/clients/search/findByCIN?CIN=" + this.props.cin;

        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                if(responseJson._embedded.clients.length!==0) this.setState({client: responseJson._embedded.clients[0],infoClient:responseJson._embedded.clients[0].infoClient})
                else this.setState({incorrect: true})
            })
            .catch(() => {
                this.setState({message: 'erreur'})
            })


    }
    getData=() =>{
        console.log(this.state.client);
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
        console.log(name)


    }
    handleChange2 = event => {
        const target = event.target;
        this.setState({checked:target.checked})
        this.setState({indeterminate:target.indeterminate})
        console.log(target)
    }

    handleChange3 = event => {
        const target = event.target;
        var selected=parseInt(target.id[20])
        var option=projets[selected]
        console.log(option.title)
        console.log(target)
        this.setState({selectedValue:option.title})
    }

    handleChange4 = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (parseFloat(value) >300000 && this.state.selectedValue == "Auto" || parseFloat(value) >20000000 && this.state.selectedValue == "Imobilier" || parseFloat(value) >100000 && (this.state.selectedValue == "Travaux" || this.state.selectedValue == "Divers")){
            alert ("vous avez atteint le maximum du montant permis pour votre projet")
        }
        this.setState({
            [name]: value,
        })

        console.log(name)


    }


    handleSubmit = key => {
        const token=localStorage.getItem("token")
        fetch('https://scoring-back-heroku.herokuapp.com/infoClients/'+key, {
            method: 'PATCH',
            body: JSON.stringify(
                {
                    natureProjet: this.state.selectedValue,
                    credit: this.refs["credit"+key].value,
                    mois: this.refs["mois"+key].value,
                    taeg: this.refs["taeg"+key].value,
                    montant: this.refs["montant"+key].value,


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
            })
        var montant=this.refs["montant"+key].value!="" ?parseFloat(this.refs["montant"+key].value):0
        var taux=(montant*100*12)/(parseFloat(this.refs["credit"+key].value) * (parseFloat(this.refs["mois"+key].value)/12))
        var TAEG=parseFloat(this.refs["taeg"+key].value) +taux
        var tauxFinal=TAEG/(100 *12)

        var x=1-1/((1+tauxFinal)**parseFloat(this.refs["mois"+key].value))
        var resultat=(parseFloat(this.refs["credit"+key].value) * tauxFinal )/x

        serviceName.sharedData = resultat*parseFloat(this.refs["mois"+key].value)

        this.setState({montantTotalDu:resultat*parseFloat(this.refs["mois"+key].value)})
        this.setState({donnees:
            {
                natureProjet: this.state.selectedValue,
                montantProjet: this.refs["credit"+key].value,
                dureeRemboursement: this.refs["mois"+key].value,
                montantMensuel: resultat,
                taeg: this.refs["taeg"+key].value,
                assurance: montant,
                assuranceTotale: montant*12,
                montantTotalDu:this.state.montantTotalDu
            }})
        sessionStorage.setItem("client",JSON.stringify(this.state.client))
        sessionStorage.setItem("data",JSON.stringify({
            natureProjet: this.state.selectedValue,
            montantProjet: this.refs["credit"+key].value,
            dureeRemboursement: this.refs["mois"+key].value,
            montantMensuel: resultat,
            taeg: this.refs["taeg"+key].value,
            assurance: this.refs["montant"+key].value,
            assuranceTotale: parseFloat(this.refs["montant"+key].value)*12,
            montantTotalDu:this.state.montantTotalDu
        }))
        this.setState({test:true})


    }




        render() {
        var required="required"

            if(this.state.incorrect===true) return <Accueil cin={this.props.cin} />
            else {
                if(this.state.test){
                    return <InfoPerso clientId={this.state.client.id} client={this.state.client} data={this.state.donnees}/>
                }

                else {

                    return (


                        <section className="container">
                            <div className="wrapper">
                                <center><Stepper level="1" /></center>
                                <form onSubmit={() => this.handleSubmit(this.state.client.id)}>
                                    <h1>Projet</h1>
                                    <div className="group">
                                        <Autocomplete
                                            {...natureProjet}
                                            id="natureProjet"
                                            onChange={this.handleChange3}
                                            debug
                                            name="natureProjet"
                                            renderInput={(params) => <TextField {...params} label="Nature du projet" margin="normal" required={required}/>}
                                        />
                                    </div>



                                    <div  className="group">
                                        <input  id="credit" name="credit" type="text"onChange={this.handleChange4}
                                                ref={"credit"+this.state.client.id} required="required"/>
                                        <span className="highlight"></span><span
                                        className="bar"></span>
                                        <label htmlFor="cin" >Montant du projet</label>
                                    </div>

                                    <div className="group">
                                        <input id="mois" name="mois" type="text"
                                               onChange={this.handleChange} ref={"mois" + this.state.client.id} required={required}/>
                                        <span className="highlight"></span><span
                                        className="bar"></span>
                                        <label htmlFor="cin">Nombre de mois</label>
                                    </div>
                                    <div className="group">
                                        <input  id="taeg" name="taeg" type="text"
                                                onChange={this.handleChange} ref={"taeg" + this.state.client.id} required={required}/>
                                        <span className="highlight"></span><span
                                        className="bar"></span>
                                        <label htmlFor="cin">TAEG Fixe</label>
                                    </div>

                                    <div className="group">
                                        <p>Est ce que vous avez une assurance
                                            <Checkbox

                                                checked={this.state.checked}
                                                indeterminate={this.state.indeterminate}
                                                onChange={this.handleChange2}
                                            /></p>
                                    </div>

                                    <div className="group" hidden={!this.state.checked}>
                                        <input id="montant" name="montant" type="text"
                                               onChange={this.handleChange} ref={"montant" + this.state.client.id} required={required}/>
                                        <span className="highlight"></span><span
                                        className="bar"></span>
                                        <label htmlFor="cin">Montant de l'assurance par mois</label>
                                    </div>


                                    <div className="btn-box">
                                        <button className="btn btn-submit" type="submit">Suivant</button>
                                        <Link to="/Accueil">
                                            <button className="btn btn-cancel" type="button">Retour</button>

                                        </Link>
                                    </div>


                                </form>
                            </div>
                        </section>

                    )
                }
            }}
}

export default Projet;
