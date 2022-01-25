import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import Moralis from 'moralis';
import { useMoralis } from 'react-moralis';

import PageHeader from 'components/Header/PageHeader';
import { Row } from 'antd';
import './css/ProfileView.css'
import ProfileUserInfo from './component/ProfileUserInfo';
import ProfileDataInfo from './component/ProfileDataInfo';
import PageFooter from 'components/Footer/PageFooter';

import { getNFTsFromMoralis } from 'config/ApiServices';
import { PUBLIC_PREFIX_PATH } from 'config/AppConfig';

const ProfileView = () =>{
    const {account, chainId} = useWeb3React();
    const {authenticate, isAuthenticated, user} = useMoralis();
    const navigate = useNavigate();

    const [blockchainData, setBlockchainData] = useState({});
    const [nfts, setNFTs] = useState();
    const options = {chain: 'rinkeby', address: account};

    useEffect( async () => {
        if(account) {
            const ethNFTs = await Moralis.Web3API.account.getNFTs(options);
            // console.log(ethNFTs);
            // axios.get(getNFTsFromMoralis('kovan', account)).then(res => {
            //     // setBlockchainData(res.data);
            //     // blockchainData.assign(res.data);
            //     // alert("sdf")
            //     setBlockchainData(res.data);
            // }).catch(err => {
            //     console.log(err);
            // })
        }
        else {
            navigate(`/${PUBLIC_PREFIX_PATH}/sell`);
        }
    }, [])
    return(
        <>
        <PageHeader theme="white" ></PageHeader>
        <Row className="ProfileContent" justify="center">
            <Row className="ProfileContentInRow">
                <ProfileUserInfo/>
                <ProfileDataInfo blockchainData={blockchainData}/>
            </Row>
        </Row>
        <PageFooter />
        </>
    )
}

export default ProfileView;