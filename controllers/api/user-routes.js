const router = require("express").Router();
const { User, Artist, FavoriteArtist } = require("../../models");

// CREATE new user
// /api/users
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
      state: req.body.state,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
// /api/users/login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id;
      console.log(
        "🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie",
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
// /api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Get favorite artists
// api/users/favorites
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
    const favorites = favoritesData.artists.map((item) =>
      item.get({ plain: true })
    );
    res.render("favorites", { favorites }); //: ['What?','Huh?']}) //: ['What', 'Do']})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
