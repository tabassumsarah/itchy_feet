import React, { Component } from 'react';
import logo from './logo.svg';
import './Bootstrap.css';
import './App.css';
import { TravelCard } from "./TravelCard.js";
import { SearchResults } from "./SearchResults.js";
import { Header } from "./Header.js";

const Loader = () => {
  return (
    <div className="spinner">
      <div className="cube1"></div>
      <div className="cube2"></div>
    </div>
  );
};

const imageName = ['melb', 'goldcoast', 'perth','tas', 'hochi', 'hongkong', 'istanbul'];

function constructImgUrl(name){
 
   return "http://localhost:3001/images/" + name + ".jpg"
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      results: [],
    };
  }

  componentDidMount() {
    this.loadData().then((results) =>{
    // this.getResults().then((results) =>{
      this.setState({
        loading: false,
        results,
      });
    });
  }

  loadData() {
    return new Promise(resolve => {
      const http = new XMLHttpRequest();
      const url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAFoYB5w3LU2YehLwt-g1eH4m8dIeg0E7Q';
      // const url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAIFOG0c5_tRk2k6fUBYuVrvbwxFPD2kh0';
      const params = JSON.stringify({
        "request": {
          "passengers": {
            "adultCount": 1
          },
            "slice": [
                {
                    "origin": "SYD",
                    "destination": "MEL",
                    "date": "2017-11-01"
                }
            ]
        }
      });

      http.open("POST", url, true);
      http.setRequestHeader("Content-type", "application/json");
      http.onreadystatechange = () => {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
              const response = JSON.parse(http.responseText);
              const formattedResponse = this.formatResponse(response);
              resolve(formattedResponse);
          }
      }
      http.send(params);
    });

  }

  formatResponse(response) {
    const cities =  response.trips.data.city;
    const map = new Map();
    cities.forEach((city) => {
      response.trips.tripOption.forEach(option => {
        return option.slice.forEach(sl=>{
          return sl.segment.forEach(sg=>{
            return sg.leg.forEach(lg=>{
              map.set(lg.destination, option.saleTotal);
            });
          });
        });
      });
    });

    return cities.map((city, idx) => {
      return {
        title: city.name,
        imgUrl: imageName[idx] ? constructImgUrl(imageName[idx]) : null,
        price: map.get(city.code),
        date: +(new Date()),
      };
    });
  } 

  getResults() {
    return new Promise(resolve => {
      const request = new XMLHttpRequest();
      const request_url = "http://localhost:3001/results";
      request.onreadystatechange = () => {
          if (request.readyState === 4) {
              if (request.status === 200) {
                  setTimeout(() => {
                    resolve(JSON.parse(request.responseText));
                  }, 2500);
              }
          }
      };

      request.open('GET', request_url, true);
      request.send();
    });
  }

  render() {
    const content = this.state.loading ? <Loader /> : <SearchResults results={this.state.results} />;
    return (
      <div className="App">
       <Header 
        name={"Sonya"}
        budget={1000}/>
       {content}
      </div>
    );
  }
}

export default App;
