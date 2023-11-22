import api from '../services/api.js';

const PopUps = require('./PopUps.js');

export function createPersonData (formdata) {
    try {
        api.post('/inscricao/pessoa', formdata)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) {
                    PopUps.confirmationSuccess()
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error.message))
                if (JSON.stringify(error.message).includes('413')) {
                    PopUps.confirmationTamanho()
                }
                if (JSON.stringify(error.message).includes('415')) {
                    PopUps.confirmationExtensao()
                }
            })

    } catch (error) {
        PopUps.confirmationServerError()
    }
}