import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Accueil from "./Accueil";
import Routage from "./Routage"
import serviceName from './Shared.js';
import Secured from "./securite/Secured";
import Keycloak from "keycloak-js";
import PageAccueil from "./PageAccueil";
import Logout from "./Logout";

function App() {

         return (
             <div>
               <Secured/>
             </div>
         )





}

export default App;
