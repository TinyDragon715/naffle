import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from 'config/RoutesConfig';
import { Web3ReactProvider } from '@web3-react/core';
import { MoralisProvider } from 'react-moralis';
import getLibrary from 'config/getLibrary';
import { appId, serverUrl } from "config/Moralis.Config";
import { Provider } from "react-redux";
import store from 'store';

function App() {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MoralisProvider appId={appId} serverUrl={serverUrl}>
          <Router>
            <AppRoute />
          </Router>
        </MoralisProvider>
      </Web3ReactProvider>
    </Provider>
  )
}

export default App;
