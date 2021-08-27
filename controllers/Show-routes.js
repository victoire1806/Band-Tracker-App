const router = require("express").Router();
const { User, Artist, Show, FavoriteArtist, Venue} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) =>{
  Show.findaAll({
    where:{
      userId: require.session.userID
    }
  })
  .then(dbShowData =>{
    const shows = dbShowData.map((show) => show.get({plain: true}));

    res.render("all-shows", {
      layout: "home",
      shows
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect("login");
  });
});
    // needs the handelebars name for shows
router.get("/", withAuth, (req, res) =>{
  res.render("new-show", {
    layout: "home"
  });
});
     // needs handlebars 
router.get("", withAuth, (req, res) =>{
  shows.findByPk(req.params.id)
  .then(dbShowData => {
    if (dbShowData){
      const shows = dbShowData.get({plain: true});
      // needs the .util
      res.render("", {
        layout: "home",
        shows
      });
    }else{
      res.status(404).render();
    }
  })
  .catch(err =>{
    res.status(500).json(err);
  });
});

module.exports = router;