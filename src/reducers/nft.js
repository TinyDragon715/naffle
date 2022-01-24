import { STORE_NFTS, STORE_NFT } from '../actions/types';

const initialState = [];

const nftreducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STORE_NFTS:
      return {nfts: payload};
    case STORE_NFT:
      return {nft: payload};
    default:
      return state;
  }
}

export default nftreducer;