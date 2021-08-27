const axios = require("axios")

module.exports = {

    getEvents: async (artistName, date, state) => {
        let artistName='Nas';
        let date='10/10/2020'
        const response = await axios.get(`https://rest.bandsintown.com/${artistName}&date=${date}&`);
        return response;

    }
}

