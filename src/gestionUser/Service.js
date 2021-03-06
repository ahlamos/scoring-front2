

class Service  {



    getUsers() {
        var url="https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users";
        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        })
            .catch(()=>{
                this.setState({ message: 'erreur'})
            })


    }
    getUserById(id) {
        var url="https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users"+id;
        fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        })
            .catch(()=>{
                this.setState({ message: 'erreur'})
            })
        }

        deleteUser(id) {
            var url="https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users"+id;
            fetch(url, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer "+localStorage.getItem("token")
                },
            })
                 .catch(()=>{
                    this.setState({ message: 'erreur'})
                })
        }



    addUser(newUser) {
        var url="https://heroku-keycloak.herokuapp.com/auth/admin/realms/plateforme-scoring/users";
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer "+localStorage.getItem("token")
            },
        })
          .catch(()=>{
                this.setState({ message: 'erreur'})
            })
    }





}

export default new Service()
