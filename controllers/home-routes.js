const router = require("express").Router();
const { User, Artist, Show, FavoriteArtist, Venue } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // const dbUserData = await User.findAll({
    //   include: [
    //     {
    //       model: Artist,
    //       attributes: ['username', 'password'],
    //     },
    //   ],
    // });

    // const artist = dbUserData.map((artist) =>
    //   artist.get({ plain: true })
    // );

    res.render(
      "homepage",
      {
        logged_in: req.session.logged_in,
      } /*, {
      artist,
    }*/
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  console.log("It works!");
  res.render("login");
});

router.get("/signup", (req, res) => {
  console.log("It works!");
  res.render("signup");
});

// router.get("/favorites", (req, res) =>
//   res.render("favorites", {
//     logged_in: req.session.logged_in,
//   })
// );

router.get("/artists", (req, res) =>
  res.render("artists", {
    logged_in: req.session.logged_in,
  })
);

router.get("/artists/:artistName", async (req, res) => {
  try {
    const formattedArtistName = req.params.artistName.replace("_", " ");
    const dbUserData = await Artist.findOne({
      where: {
        name: formattedArtistName,
      },
    });

    const artist = dbUserData.get({ plain: true });
    console.log("ARTISSSSSSSST", artist);
    res.render("artists", { artist, logged_in: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET artist
// router.get("/artist/:id", async (req, res) => {
//   try {
//     const dbArtistData = await Artist.findAll(req.params.id);

//     const artist = dbArtistData.get({ plain: true });

//     res.render("artist", { artist, logged_in: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Login route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/", async (req, res) => {
  // API and API key goes here
  const response = axios.get("");
  console.log(response.data);
  res.json(response.data);
});

module.exports = router;

// const router = require('express').Router();
// const { Index, User } = require('../models');
// const withAuth = require("../utils/auth")

// // GET all galleries for homepage
// router.get("/", withAuth, (req, res) => {
//   this.post.findAll({
//     where: {
//       userId: require.session.userId
//     }
//   })
//   .then(dbShowsData => {
//     const shows = dbShowsData.map((shows) => shows.get({plain: true}));

//     res.render("homepage", {
//       shows
//     });
//   })
//   .catch(err =>{
//     console.log(err);
//     res.redirect("login");
//   });
// });

// router.get("/", withAuth, (req, res) =>{

//   res.render("favorite-shows", {
//     layout: "home"
//   });
// });

// router.get("//:id", withAuth, (req, res)=>{
//   artist.findByPK(req.params.id)
//   .then(dbArtistData => {
//     if(dbArtistData){
//       const artist = dbArtistData.get({ plain: true});

//       res.render("artist-page", {
//         layout: "home",
//         artist
//       });
//     }else{
//       res.status(404).render();
//     }
//   })
//   .catch(err =>{
//     res.status(500).json(err);
//   })
// })

// module.exports = router;

router.get("/favorites", async (req, res) => {
  try {
    const favoritesData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Artist,
          through: FavoriteArtist,
        },
      ],
    });
    // console.log(req.session.user_id);

    const favorites = favoritesData.artists.map((item) =>
      item.get({ plain: true })
    );
    console.log(`Expecting Favorites Values ${favoritesData}`);
    res.status(200).render("favorites", { favorites }); //,{favorites: ['What', 'Do'], logged_in: req.session.logged_in}
  } catch (err) {
    res.status(500).json(err);
  }
});
