import React, { Component, lazy, Suspense } from 'react';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import './App.css';
import {
  Col,
  Row,
  Container,
  Nav,
  Form
} from 'react-bootstrap';
import fetch from 'node-fetch';

const CLIENT_ID = "6a1cd7b62948f55";
const API_URL = "https://api.imgur.com/3";
const SORT = ["Viral", "Top", "Time"];
const TIME = ["Day", "Week", "Month", "Year", "All"];

const ImageComponent = lazy(() => import('./components/Images/Images'));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      galleryImages: [],
      checked: true,
      show: false,
      sortDefaultValue: "viral",
      timeDefaultValue: "day",
      showTimeMenu: false
    };
  }

  componentDidMount = () => {
    this.getGalleryImages();

  }

  getGalleryImages = () => {
    fetch(API_URL + "/gallery/hot/viral/day", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data })
      );
  }

  renderLoader = () => (
    <Loader />
  )

  handleHotImages = () => {
    fetch("https://api.imgur.com/3/gallery/hot", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          galleryImages: json.data,
          showTimeMenu: false
        }),

      );
  }

  handleTopImages = () => {
    fetch("https://api.imgur.com/3/gallery/top", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          galleryImages: json.data,
          showTimeMenu: true
        })
      );
  }

  handleUserImages = () => {
    fetch("https://api.imgur.com/3/gallery/user", {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data, showTimeMenu: false })
      );
  }

  handleSortChange = (event) => {
    console.log(event.target.value);
    this.setState({
      sortDefaultValue: event.target.value
    })

    fetch(API_URL + "/gallery/hot/" + event.target.value.toLowerCase(), {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data })
      );
  }

  handleTimeChange = (event) => {
    this.setState({
      timeDefaultValue: event.target.value
    })

    fetch(API_URL + "/gallery/top/viral/" + event.target.value.toLowerCase(), {
      headers: { Authorization: 'Client-ID ' + CLIENT_ID },
    })
      .then(res => res.json())
      .then(json =>
        this.setState({ galleryImages: json.data })
      );
  }



  render() {
    return (
      <div className="App" >
        <Header />
        <Suspense fallback={this.renderLoader()}>
          <Container >
            <Row>
              <Col xs={12} md={4}>
                <Nav variant="pills" defaultActiveKey="hot">
                  <Nav.Item>
                    <Nav.Link eventKey="hot" onClick={() => this.handleHotImages()}>Hot</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="top" onClick={() => this.handleTopImages()}>Top</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="user" onClick={() => this.handleUserImages()}>
                      User
                  </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col xs={12} md={4}>
                {this.state.showTimeMenu ? (
                  <Form inline>
                    <Form.Label className="my-1 mr-2" htmlFor="timeSelectPref">
                      Sort By:
                      </Form.Label>
                    <Form.Control
                      as="select"
                      className="my-1 mr-sm-2"
                      id="bySort"
                      custom
                      onChange={(event) => this.handleTimeChange(event)}
                    >
                      {TIME.map((timeBy, key) => (
                        <option key={key} value={timeBy}>{timeBy}</option>
                      ))}
                    </Form.Control>
                  </Form>
                ) : ''}


              </Col>
              <Col xs={12} md={{ span: 4 }}>

                <Form inline>
                  <Form.Label className="my-1 mr-2" htmlFor="sortSelectPref">
                    Sort By:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="my-1 mr-sm-2"
                    id="bySort"
                    custom
                    onChange={(event) => this.handleSortChange(event)}
                  >
                    {SORT.map((sortBy, key) => (
                      <option key={key} value={sortBy}>{sortBy}</option>
                    ))}
                  </Form.Control>
                </Form>

              </Col>

            </Row>


            <Row id="gallery">
              {this.state.galleryImages.map((img, key) => {
                return img.cover ?
                  (
                    <Col md={4} className="col-padding">
                      <ImageComponent image={img} />
                    </Col>

                  ) : ''
              }
              )
              }
            </Row>
          </Container>
        </Suspense>
      </div >
    );
  }
}

export default App;
