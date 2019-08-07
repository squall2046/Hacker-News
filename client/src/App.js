import React, { Component } from "react";
import API from "./utils/API";
import Results from "./components/Results";
import { Col, Row, Container } from "./components/Grid";
import { List, ListItem } from "./components/List";
import { Form, Input, FormBtn } from "./components/Form";
import "./App.css";

class App extends Component {
  state = {
    news: [],
    title: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  searchBtnSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      this.searchNews(this.state.title)
    }
  };

  searchNews = title => {
    API.searchNews(title)
      .then(res => {
        this.setState({ news: res.data.hits });
        console.log(this.state.news[0]);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Form>
              <br />
              <h2><i className="fas fa-newspaper"></i> Hacker News</h2>
              <h5>(Powered by Algolia)</h5>
              <h6>Isaac Wu</h6>
              <br />

              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Search News Title"
              />
              <p></p>
              <FormBtn
                onClick={this.searchBtnSubmit}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">

            <Results>
              {this.state.news.length ? (
                <List>
                  {this.state.news
                    .map(news => (
                      <ListItem key={news.objectID} children={news}>
                        <a href={news.url} rel="noopener noreferrer" target="_blank">
                          <h3>{news.title}</h3>
                        </a>
                        {news.created_at ? <h6 className="rating">Published Date: {news.created_at}</h6> : console.log(" no date ")}
                        {news.author ? <h6 className="rating">Author: {news.author}</h6> : console.log(" no author")}
                      </ListItem>
                    ))
                  }
                </List>
              ) : (
                  <div>
                    <h3 className='text-center text-white'>No Results to Display</h3>
                  </div>
                )}
            </Results>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
