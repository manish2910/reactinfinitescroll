import React, { Component } from "react";
import axios from 'axios';
import "./index.css";

class App extends Component {
    state = {
      data: [],
      per: 3,
      page: 1,
      total_pages: null,
      scrolling:false
    };

  loadUser = () => {
    const { per, page, data } = this.state;
    const url = `https://reqres.in/api/users?per_page=${per}&page=${page}`;
    axios.get(url).then(json =>{
      this.setState({
        data: [...data, ...json.data.data],
        scrolling: false,
        total_pages: json.data.total_pages
      })
      }
    );
  };

  componentDidMount() {
    this.loadUser();
  }

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadUser
    );
  };

  render() {
    let { page, total_pages} = this.state;
    return (
      <div className="App">
        <h1>User</h1>
        <div className='parent'>
          {this.state.data.map(data => (
            <div className='child' key={data.id}>
              <div>
                <div>
                  <img style={{width:"400px"}} src={data.avatar} alt="Display Picture" />
                </div>
                <div>{data.first_name}</div>
                <div>{data.last_name}</div>
              </div>
            </div >
          ))}
        </div>
        {page === total_pages ? "That's All":<button
          onClick={e => {
            this.loadMore();
          }}
        >
          Load More
        </button>}
      </div>
    );
  }
}

export default App;
