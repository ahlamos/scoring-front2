import React, { Component } from 'react'
import './formulaire.css'
import {BrowserRouter as Router,withRouter, Route, Link} from "react-router-dom";
import Projet from './InfoClients/Projet'
import "antd/dist/antd.css"


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },

];
const test = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
};

class Accueil extends Component {
    constructor(props){
        super(props);
        this.state={
            cin:"",
            clients:'',
            isFind:false,
            chartData:{},
            information:"",
            incorrect:false

        }
    }
    componentDidMount() {
        if(this.props.cin!=undefined) this.setState({incorrect: true})


    }



    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
        console.log(value)


    }



    getData(){

        //this.props.history.push('/Rechercher');

    }
    handleSubmit =()=> {
        this.setState({isFind:true})
    }
    render(){
        var required="required"

        if(this.state.isFind) return <Projet cin={this.state.cin}/>
        else {
        return (


                    <section className="container">

                        <div className="wrapper">
                            <form onSubmit={() => this.handleSubmit()}>
                                <h1>Rechercher par CIN</h1>
                                <div className="group">
                                    <input type="text" id="cin" name="cin"  onChange={this.handleChange} required={required}/><span className="highlight"></span><span
                                    className="bar"></span>
                                    <label>CIN</label>
                                </div>

                                {this.state.incorrect==true?
                                    <div>
                                        <center><h4>Le client avec  cin "{this.props.cin}" n'existe pas</h4></center>
                                    </div>
                                    :null
                                }

                                <div className="btn-box">
                                    <button className="btn btn-submit">Rechercher
                                    </button>
                                </div>

                            </form>

                        </div>


                    </section>

        );
    }
    }
}
export default Accueil;
