const router = require("express").Router();
const { User, Artist, Show, FavoriteArtist, Venue} = require("../models");
const withAuth = require("../utils/auth");


router.get("/", (req, res) =>{
  Venue.findAll({
    where:{
      iserId: require.session.userId
    }
  })
  .then(dbVenueData =>{
    const venue = dbVenueData.map((venue) => venue.get({plain: true}));
    res.render("all-venues", {
      venue
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect("login");
  });
});
// needs the handlebars
router.get("", withAuth, (req, res) => {
  // needs utils
  res.render("", {
    layout: "home"
  });
});
      // needs handlebars
router.get("", withAuth, (req, res) => {
  Venue.findByPk(req.params.id)
  .then(dbVenueData => {
    if(dbVenueData){
      const venue = dbVenueData.get({ plain: true});
      // needs utils
      res.render("", {
        layout: "home",
        venue
      });
    }else{
      res.status(404).render();
    }
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

module.exports = router;