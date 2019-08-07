const axios = require("axios");

// Defining methods for the booksController
module.exports = {
  search: function (req, res) {
    // let bookTitle = req.params.bookTitle.replace(/\s/g, "+");
    let title = req.params.title.trim().split(" ").join("+");
    console.log("server side:", title);
    axios.get(
      `https://hn.algolia.com/api/v1/search?query=${title}&tags=story`
    ).then(response => {
      res.json(response.data)
    }).catch(err => {
      res.json({ error: error })
    });
  },
};
