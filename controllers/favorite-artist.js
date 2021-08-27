const router = require("express").Router();
const { User, Artist, Show, FavoriteArtist, Venue} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res)=>{
  FavoriteArtist.findAll({
    where:{
      userId :require.session.userId
    }
  })
  .then(dbFavoriteArtistData =>{
    const favArtist = dbFavoriteArtistData.map((favArtist) => favArtist.get({ plain: true}));
    res.render("favorite-artists", {
      favArtist
    });
  })
  .catch(err =>{
    console.log(err);
    res.redirect("login");
  });
});
   //needs the correct handlebars
router.get("/homepage", withAuth, (req, res) => {
    // needs the utils
  res.render("", {
    layout: "home"
  });
});
      // needs handlebars
router.get("/", withAuth, (req, res) => {
  FavoriteArtist.findByPk(req.params.id)
  .then(dbFavoriteArtistData => {
    if(dbFavoriteArtistData){
      const favArtist =dbFavoriteArtistData.get({plain: true});
      // needs utils
      res.render("", {
        layout: "home",
        favArtist
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