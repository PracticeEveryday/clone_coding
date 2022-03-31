const { Router } = require("express");
const movieControl = require("../controller/movieControl");

const router = Router();

router.route("/").get(movieControl.getMovies).post(movieControl.inserMovie);

module.exports = router;
