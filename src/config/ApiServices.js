export const getCovalenthqData = (_chain, _address) => {
    return `https://api.covalenthq.com/v1/${_chain}/address/${_address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=true&key=ckey_9014ae23814045cdb2d7896827e`;
}

export const getNFTsFromMoralis = (_chain, _address) => {
    return `https://deep-index.moralis.io/api/v2/${_address}/nft?chain=${_chain}&format=decimal`;
}