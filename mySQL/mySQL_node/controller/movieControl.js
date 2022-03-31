const connection = require("../dbconfig");

const movieControl = {
  getMovies: async (req, res) => {
    connection.query("SELECT * FROM movie", (error, rows) => {
      if (error) throw error;
      console.log(rows);
      res.send(rows);
    });
  },
  inserMovie: async (req, res) => {
    const { id, title, person, genre, runningtime } = req.body;
    const sql = `INSERT INTO movie(movie_id, title, person, genre, runningtime) VALUES(${id}, '${title}', '${person}', '${genre}', ${runningtime});
    `;
    connection.query(sql, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },
};

module.exports = movieControl;
