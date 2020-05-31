import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AjoutSegment extends Component {
    constructor(props){
        super(props);
        this.state={
           debut:"",
           fin:"",
           notation:"",
           description:"",
            segments:[]
        }
    }

    componentDidMount() {
      var url="https://scoring-back-heroku.herokuapp.com/segments?projection=segNot"; 
      fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer "+localStorage.getItem("token")
        },
    })
        .then(response => response.json())
        .then(responseJson => this.setState({segments: responseJson._embedded.segments.sort((a,b) => a.debut - b.debut)}))
        .catch(()=>{
            this.setState({ message: 'erreur'})
        })
    }

    handleSubmitForAdd = (event) =>{
      if(this.state.fin<=this.state.segments[this.state.segments.length-1].fin) alert("la fin ne peut pas etre <"+this.state.segments[this.state.segments.length-1].fin)
      else {
      const segment= {
        debut:this.state.segments[this.state.segments.length-1].fin,
        fin:this.state.fin,
        notation:{
          notation:this.state.notation,
          description:this.state.description
        }
      }
      this.setState({
        segments:this.state.segments.concat(segment)
      });
      this.handleSubmit(event)
      document.getElementById('fermer').click()

    }}


    delete = index => {
      
      this.setState(state => {
        var length= state.segments.length-1;
        const segments = state.segments;
        if(index!=length && index!=0) {
          segments[parseInt(index)-1].fin=segments[parseInt(index)].fin;
        }
        return segments
      });
     this.setState({
      segments:this.state.segments.filter(item=>this.state.segments.indexOf(item)!=index)
    });

    }

    handleSubmit = (event) =>{
      var url="https://scoring-back-heroku.herokuapp.com/majSegments";
      console.log("length= "+this.state.segments.length)
      fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer "+localStorage.getItem("token")
        },
          body: JSON.stringify(this.state.segments)
      })
      alert("la mise a jour a été faite")
      event.preventDefault();

    }


    handleChange2 = event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      })
      
    }

    handleChangeDebut = event=> {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      var index = target.name;
      
      this.setState(state => {
        const segments = state.segments;
        segments[index].debut=value;
        if(index!=0) {
          segments[index-1].fin=value;
        }
        return segments
      });
    }

    handleChangeFin = event=> {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      var index = target.name;
      
      this.setState(state => {
        var length= state.segments.length-1;
        const segments = state.segments;
        segments[index].fin=value;
        if(index!=length) {
          segments[parseInt(index)+1].debut=value;
        }
        return segments
      });
    }
    
    render(){
        return(
            <div className="content">
            <section className="container">
        <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Gerer vos segments</h3>

          <div className="box-tools pull-right">
            <button type="button" className="btn btn-box-tool" data-toggle="modal" data-target={"#modal-add"}>Ajouter un segment</button>
            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
          </div>
        </div>
        <div className="box-body">

        <form onSubmit={this.handleSubmit}>
         <table className="table table-hover">
         <thead>
          <tr>
              <th></th>
              <th>Debut_Segment</th>
              <th>Fin_Segment</th>
              <th>NOTATION</th>
          </tr>
        </thead>
         <tbody>
         {
              this.state.segments.map( (segment,index) =>(
                <tr key={this.state.segments[index].id}>
                  <td><th>segment{index+1}</th></td>
                  <td><input type="number" className="forrm-control" placeholder="Enter debut" value={this.state.segments[index].debut} name={index} onChange={this.handleChangeDebut} required/></td>
                  <td><input type="number" className="forrm-control" placeholder="Enter fin" value={this.state.segments[index].fin} name={index} onChange={this.handleChangeFin} required/></td>
                  <td><input type="text" className="forrm-control" value={this.state.segments[index].notation.notation} disabled/></td>
                  <td><i className="fa fa-fw fa-trash" onClick={() => this.delete(index)}></i></td>
                </tr>
                                        ))
          }
         </tbody>
         </table>
         <button className="btn btn-submit float-right" type="submit">Mise à jour</button>
      </form>

        <div className="modal modal-info fade" id={"modal-add"}>
        <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Ajouter nouveau segment:</h4>
            </div>
            <div className="modal-body">
           
           <form onSubmit={this.handleSubmitForAdd}>
            <div className="row">
                <div className="col-md-6">
                    <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">FIN</h3>
                    </div>
                    <div className="box-body">
                      <div className="form-group">
                        <input type="number" className="forrm-control" placeholder="Enter fin" name="fin" onChange={this.handleChange2} required/>
                      </div>         
                    </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Notation</h3>
                    </div>
                    <div className="box-body">
                      <div className="form-group">
                        <input type="text" className="forrm-control" placeholder="Enter notation" name="notation" onChange={this.handleChange2} required/>
                      </div>            
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Description</h3>
                    </div>
                    <div className="box-body">
                      <div className="form-group">
                        <input type="text" className="forrm-control" placeholder="Enter description" name="description" onChange={this.handleChange2} required/>
                      </div>          
                    </div>
                    </div>
                </div>
                </div>
            <button className="btn btn-submit" >Ajouter</button>
            </form>
            </div>
          <div className="modal-footer">
              <button type="button" id="fermer" className="btn btn-outline pull-left" data-dismiss="modal">Fermer</button>
          </div>
          </div>
          </div>
        </div>
    </div>
      
      <div className="box-footer">
        copyright: MOKRYM MOHAMED TAHA  AND  FADILI AHLAM.
      </div>
      </div>
      </section>
  
      </div>

        )
    }
}
export default AjoutSegment
