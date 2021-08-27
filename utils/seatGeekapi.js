const axios = require("axios");

module.exports = {

    getEvents: async (artistName, date, state) => {
        try {

            let artistName=artistName.toLowerCase();
            artistName=artistName.replace(" ", "-");

            const response = await axios.get(`https://api.seatgeek.com/2/events?client_id=MjMwODMxMzN8MTYzMDA4NTY3MC41NzI3ODM1&client_secret=f39e4e127b96d5a5ebe564406c6ed475fe86efa8834c2ba57fb3c6135f72ac05&venue.state=${state}&type=concert&performers.slug=${artistName}&datetime_utc.gt=${date}`);
            return response;
        } catch (error) {
            return error;


        }

       
    },

    getArtistinfo: async (artistName) => {
        try{

            let artistName=artistName.toLowerCase();
            artistName=artistName.replace(" ", "-");

            const response = await axios.get(`https://api.seatgeek.com/2/performers/?client_id=MjMwODMxMzN8MTYzMDA4NTY3MC41NzI3ODM1&client_secret=f39e4e127b96d5a5ebe564406c6ed475fe86efa8834c2ba57fb3c6135f72ac05&slug=${artistName}`);
        }catch (error) {
            return error;
        }
    },

    getHomepageEvents: async (artistName, date) => {
        try {

            let artistName=artistName.toLowerCase();
            artistName=artistName.replace(" ", "-");

            const response = await axios.get(`https://api.seatgeek.com/2/events?client_id=MjMwODMxMzN8MTYzMDA4NTY3MC41NzI3ODM1&client_secret=f39e4e127b96d5a5ebe564406c6ed475fe86efa8834c2ba57fb3c6135f72ac05&type=concert&performers.slug=${artistName}&datetime_utc.gt=${date}`);
            return response;
        } catch (error) {
            return error;
        } 
    },

};


