import logo from './logo.svg';
import './App.css';
import React from 'react';
import TopNav from "./Components/TopNav/TopNav";
import Routes from "./routes/Routes";
import { Interceptor } from "./Utils/Interceptor";
import CustomSpinner from "./Components/CustomSpinner/CustomSpinner";

class App extends React.Component {
  state = {
    loaderVisible: false,
    topNavVisible: true,
  }
  constructor(props: any) {
    super(props)
    this.state = {
      loaderVisible: false,
      topNavVisible: true,
    }
    Interceptor.interceptRequest(this);
    Interceptor.interceptResponse(this);
  }
  componentDidMount() {
    this.setState({ topNavVisible: !["/login"].includes(window.location.pathname) })
  }

  render() {
    return (
      <div className="App" >
        {this.state.topNavVisible ?
          <TopNav />
          : null}
        <Routes />
        {this.state.loaderVisible ?
          <CustomSpinner />
          : null}
      </div>
    )
  }
}

export default App;
