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



router.get("/favorites", async (req, res) => {
  try {
    const favoritesData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Artist,
          through: FavoriteArtist,
          include: [
            {
              model: Venue,
              through: Show
            }
          ]
        },
      ],
    },
   );
    // console.log(req.session.user_id);
    // res.json(favoritesData)
    const favorites = favoritesData.artists.map((item) =>
      item.get({ plain: true })
    );
    console.log(`Expecting Favorites Values ${favoritesData}`);
    res.status(200).render("favorites", { favorites }); 
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/favorites", async (req, res) => {
//   try {
//     const favoritesData = await User.findByPk(req.body.user_id, {
//       include: [
//         {
//           model: Artist,
//           through: FavoriteArtist,
//           include: [
//             {
//               model: Venue,
//               through: Show
//             }
//           ]
//         },
//       ],
//     },
//     {
//       where: {
//         id: req.body.user_id
//       }
//     });
//     // console.log(req.session.user_id);
//     res.json(favoritesData)
//     const favorites = favoritesData.artists.map((item) =>
//       item.get({ plain: true })
//     );
//     console.log(`Expecting Favorites Values ${favoritesData}`);
//     res.status(200).render("favorites", { favorites }); 
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;