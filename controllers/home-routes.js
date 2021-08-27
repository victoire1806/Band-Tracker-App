const router = require('express').Router();
const { User, Artist, Show, FavoriteArtist, Venue} = require('../models');
const withAuth = require("../utils/auth");
    
 router.get('/', async (req, res) => {
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
      "homepage" /*, {
      artist,
    }*/
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/artist/:id", async (req, res) => {
  try {
    const dbUserData = await Artist.findByPk(req.params.id, {
      include: [
        {
          model: Artist,
          attributes: ["id", "upcoming_shows", "upcoming_dates"],
        },
      ],
    });

    const Artist = dbUserData.get({ plain: true });
    res.render("artist", { user, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET artist
router.get("/artist/:id", async (req, res) => {
  try {
    const dbArtistData = await Artist.findAll(req.params.id);

    const artist = dbArtistData.get({ plain: true });

    res.render("artist", { artist, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/", async (req, res) => {
                          // API and API key goes here
  const response = axios.get("");
  console.log(response.data);
  res.json(response.data)
})

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
