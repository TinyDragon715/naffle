import { combineReducers } from 'redux';
import alert from './alert';
import storedNfts from './nft';

export default combineReducers({
  alert,
  storedNfts
});
