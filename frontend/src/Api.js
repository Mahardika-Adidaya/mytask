import request from "./utils/request";

class Api {

    static urlAPI() {
        return "http://localhost:5000/"
    }
    
    // Begin :: Auth
    static Login(email, password) {
        let path = 'login';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data: {
                email,
                password,
            },
        })
    }

    //Logout
    static Logout() {
        let path = 'logout';
        return request(`${this.urlAPI()}${path}`, {
            method: 'DELETE',
            
        })
    }

    // ME - utk detect login
    static Me() {
        let path = 'me';
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
        })
    }

    // Begin :: Auth
    static getTask(data) {
        let path = 'task';
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
        })
    }

    // static Register(data) {
    //     let path = 'register';
    //     return request(`${this.urlAPI()}${path}`, {
    //         method: 'POST',
    //         data,
    //     })
    // }

    // POST Task
    static Task(data) {
        let path = 'task';
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data,
        })
    }

    // UPDATE password
    static UpdatePassword(data) {
        let path = 'change-password';
        return request(`${this.urlAPI()}${path}`, {
            method: 'PATCH',
            data,
        })
    }


}
export default Api;