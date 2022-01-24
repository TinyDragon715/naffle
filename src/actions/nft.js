import { STORE_NFTS, STORE_NFT } from './types';

export const storeNFT = (nfts) => dispatch => {
  dispatch({
    type: STORE_NFTS,
    payload: nfts
  });
};

export const storeSelected = (nft) => dispatch => {
  dispatch({
    type: STORE_NFT,
    payload: nft
  })
}