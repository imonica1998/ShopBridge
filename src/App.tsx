import './App.css';
import React from 'react';
import TopNav from "./Components/TopNav/TopNav";
import Routes from "./routes/Routes";
import { Interceptor } from "./Utils/Interceptor";
import CustomSpinner from "./Components/CustomSpinner/CustomSpinner";

class App extends React.Component {
  state = {
    loaderVisible: false,
  }
  constructor(props: any) {
    super(props)
    this.state = {
      loaderVisible: false,
    }
    Interceptor.interceptRequest(this);
    Interceptor.interceptResponse(this);
  }

  render() {
    return (
      <div className="App" >
        {!["/login"].includes(window.location.pathname) ?
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
