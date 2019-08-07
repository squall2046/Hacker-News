import axios from "axios";

export default {

  getBooks: function () {
    return axios.get("/api/news");
  },
  getBook: function (id) {
    return axios.get("/api/news/" + id);
  },

  searchNews: (title) => {
    title = title.trim().split(" ").join("+");
    console.log("client side:", title);
    return axios.get(`/api/news/search/${title}`);
  },
};
