import React, { Component } from "react";
import Search from "./components/Search";
import User from "./components/User";
import Follower from "./components/Follower";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  constructor() {
    console.log("constructor render ");
    super();
    this.state = {
      url: "https://api.github.com/users/",
      userSearch: [],
      user: "",
      userData: [],
      followers: [],
    };
  }

  // Lifecycle Methods //

  componentDidMount() {
    console.log("did mount");
    //fetch initial data
    // axios
    //   .get("https://api.github.com/users")
    //   .then((res) => {
    //     // console.log(res.data)
    //     this.setState({ userData: res.data });
    //   })
    //   .catch((err) => console.log(err));

    axios
      .get("https://api.github.com/users/Owlspec3086/followers")
      .then((res) => {
        console.log(res.data);
        this.setState({ followers: res.data });
      });
  }
  // #Stretch
  componentDidUpdate(prevProps, prevState) {
    // console.log('did update')
    if (this.state.user !== prevState.user) {
      console.log("update");
      axios
        .get(`https://api.github.com/users/${this.state.user}`)
        .then((res) => {
          // console.log(res.data)
          this.setState({ userData: res.data });
        })
        .catch((err) => console.log(err));

      axios
        .get(`https://api.github.com/users/${this.state.user}/followers`)
        .then((res) => {
          console.log(res.data);
          this.setState({ followers: res.data });
        });
    }
  }

  searchChange = (evt) => {
    this.setState({ userSearch: evt.target.value });
  };
  searchSubmit = (evt) => {
    evt.preventDefault();

    this.setState({ user: this.state.userSearch });
  };

  render() {
    console.log("render");

    return (
      <div className="App">
        <Search
          search={this.searchChange}
          submit={this.searchSubmit}
          userSearch={this.state.userSearch}
        />
        <br />

        <div>
          <User userData={this.state.userData} />
        </div>

        <div>
          {this.state.followers.map((item) => {
            return <Follower follower={item} />;
          })}
        </div>
      </div>
    );
  }
}
