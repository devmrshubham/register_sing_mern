import axios from 'axios'
const Url = "http://localhost:5000"

const sendData = (data) => {
    return new Promise(async (resolve, rejected) => {
        try {
            await axios.post(`${Url}/user`, data)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )
        } catch (error) {
            rejected(error)
        }
    })
}

const login = (data) => {
    return new Promise(async (resolve, rejected) => {
        try {
            await axios.post(`${Url}/login`, data)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )
        } catch (error) {
            rejected(error)
        }
    })
}

const Forgate = (gmail) => {
    return new Promise(async (resolve, rejected) => {
        try {
            await axios.post(`${Url}/forgate_password`, gmail)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )
        } catch (error) {
            rejected(error)
        }
    })
}

const ResetPassword = (password, id, token) => {
    return new Promise(async (resolve, rejected) => {
        try {
            await axios.post(`${Url}/reset_password/${id}/${token}`, password)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )
        } catch (error) {
            rejected(error)
        }
    })
}



export { sendData, login, Forgate, ResetPassword }