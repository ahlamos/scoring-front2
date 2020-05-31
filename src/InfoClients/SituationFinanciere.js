import React, { Component } from 'react'
import '../formulaire.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Projet from "./Projet";
import ChargeMensuel from "./ChargeMensuel";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Stepper from '../Stepper'
const mois = [
    { title: "12"},
    { title:"13"} ,
    { title:"14"} ,

];
const nbMois = {
    options: mois,
    getOptionLabel: (option) => option.title,
};

class SituationFinanciere extends Component {
    constructor(props){
        super(props);
        this.state={
            s:"",
            test:false,
            client:"",
            infoClient:"",
            revenuMensuelTotal:0,
            checked: false, indeterminate: false,
            selectedNbMois:"",
        }
    }
    handleChange1 = event => {
        const target = event.target;
        console.log(target.id)
        var selected=parseInt(target.id[14])
        var option=mois[selected]
        console.log(option.title)
        this.setState({selectedNbMois:option.title})
    }
    handleChange3 = event => {
        const target = event.target;
        this.setState({checked:target.checked})
        this.setState({indeterminate:target.indeterminate})
        console.log(target)
    }

    handleSubmit = key => {
        var revenuMensuel=parseFloat(this.refs["revenuMensuel"+key].value)
        var nbMois=parseInt(this.state.selectedNbMois)
        var prestationFamiliale=parseFloat(this.refs["prestationFamiliale"+key].value)
        var aides=parseFloat(this.refs["aides"+key].value)
        var rente=parseFloat(this.refs["rente"+key].value)
        var autreRevenu=parseFloat(this.refs["autreRevenu"+key].value)
        this.setState({
            revenuMensuelTotal:(((revenuMensuel * nbMois)/12) + (prestationFamiliale+aides+rente+autreRevenu))

        })
        var r=((revenuMensuel * nbMois)/12) + (prestationFamiliale+aides+rente+autreRevenu)
        sessionStorage.setItem("revenuMensuelTotal",r)
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
    handleChange2 = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
        console.log(value)


    }
    componentDidMount() {
        var client=JSON.parse(sessionStorage.getItem("client"))
        this.setState({client:JSON.parse(sessionStorage.getItem("client"))})
        this.setState({infoClient:client.infoClient})
    }

    render() {
        var required="required"
        if(this.state.test){
            return <ChargeMensuel  />
        }
        else{


        return (

            <section className="container">
                <div className="wrapper">
                    <center><Stepper level="4" /></center>

                    <form>
                        <h1>Situation Financiere</h1>


                        <div className="group">
                            <input  id="revenuMensuel" name="revenuMensuel" type="text"
                                   onChange={this.handleChange} ref={"revenuMensuel" + this.state.client.id} required={required}/>
                            <span className="highlight"></span><span
                            className="bar"></span>
                            <label htmlFor="cin">Revenu net mensuel</label>
                        </div>

                        <div className="group" >
                            <Autocomplete
                                {...nbMois}
                                id="nbMois"
                                onChange={this.handleChange1}
                                debug
                                name="nbMois"
                                renderInput={(params) => <TextField {...params} label="Nombre de mois de salaire" margin="normal"
                                required={required}/>}
                            />
                        </div>


                        <div className="group">
                            <p>Est ce que vouz avez d'autres revenus ?
                            <Checkbox
                                checked={this.state.checked}
                                indeterminate={this.state.indeterminate}
                                onChange={this.handleChange3}
                            />
                            </p>
                        </div>

                        <div className="group" hidden={!this.state.checked}>
                            <input id="prestationFamiliale" name="prestationFamiliale" type="text"
                                   onChange={this.handleChange}  ref={"prestationFamiliale" + this.state.client.id} required={required}/>
                            <span className="highlight"></span><span
                            className="bar"></span>
                            <label htmlFor="cin">Montant Prestation familiale</label>
                        </div>
                        <div className="group" hidden={!this.state.checked}>
                            <input  id="aides" name="aides" type="text"
                                   onChange={this.handleChange}  ref={"aides" + this.state.client.id} required={required}/>
                            <span className="highlight"></span><span
                            className="bar"></span>
                            <label htmlFor="cin">Montant Aides</label>
                        </div>
                        <div className="group" hidden={!this.state.checked}>
                            <input id="rente" name="rente" type="text"
                                   onChange={this.handleChange}  ref={"rente" + this.state.client.id} required={required}/>
                            <span className="highlight"></span><span
                            className="bar"></span>
                            <label htmlFor="cin">Montant Rente</label>
                        </div>
                        <div className="group" hidden={!this.state.checked}>
                            <input  id="autreRevenu" name="autreRevenu" type="text"
                                   onChange={this.handleChange}  ref={"autreRevenu" + this.state.client.id} required={required}/>
                            <span className="highlight"></span><span
                            className="bar"></span>
                            <label htmlFor="cin">Montant d Autres revenus</label>
                        </div>


                        <div className="btn-box">
                            <button className="btn btn-submit" type="submit"
                                    onClick={() => this.handleSubmit(this.state.infoClient.id)}>Suivant
                            </button>
                            <Link to="/situationProfessionnelle">
                                <button className="btn btn-cancel" type="button">Retour</button>

                            </Link>
                        </div>

                    </form>
                </div>

            </section>


        )
    }}



}
export default SituationFinanciere;
