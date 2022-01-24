import ERC721 from './abi/ERC721.json';
import RaffleNFT from './abi/RaffleNFT.json';
import TicketNFT from './abi/TicketNFT.json';
import RaffleSystem from './abi/RaffleSystem.json';
import address_config from './address_config.json';

const RaffleConfig = {
    ERC721: ERC721,
    RaffleNFTAbi: RaffleNFT,
    TicketNFTAbi: TicketNFT,
    RaffleSystemAbi: RaffleSystem,
    RaffleNFTAddress: address_config.RaffleNFTAddress,
    TicketNFTAddress: address_config.TicketNFTAddress,
    RaffleSystemAddress: address_config.RaffleSystemAddress
}

export default RaffleConfig;