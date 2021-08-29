const router = require("express").Router();
const { User, Artist, Show, FavoriteArtist, Venue} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) =>{
  Artist.findAll({
    where: {
      userId: require.session.userId
    }
  })
  .then(dbArtistData => {
    const artist = dbArtistData.map((artist) => artist.get({ plain: true}));
    res.render("all-artists", {
      artist
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect("login");
  });
});
// needs the handelebars name for new artist
router.get("", withAuth, (req, res) => {
  //  needs the .utils
  res.render("" , {
    layout: "home"
  });
});
      // needs handlebars for the add favorite
router.get("" ,withAuth, (req, res) =>{
  Artist.findAll(req.params.id)
  .then(dbArtistData => {
    if (dbArtistData){
      const artist = dbArtistData.get({ plain: true});
          // needs the .utils
      res.render("", {
        layout: "home",
        artist
      });
    }else{
      res.status(404).render();
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;