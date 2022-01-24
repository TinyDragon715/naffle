import React from 'react';
import {useRoutes, Navigate} from 'react-router-dom';
import { PUBLIC_PREFIX_PATH,AUTH_PREFIX_PATH } from './AppConfig';
import HomeView from 'views/public-views/home';
import ExploreView from 'views/public-views/explore';
// import WalletMenu from 'views/public-views/home/component/WalletMenu'
import ProfileView from 'views/auth-views/profile';
import SingleCardView from 'views/public-views/singlecard';
import NewContent from 'views/public-views/newcontent';
import SellPage from 'views/public-views/sell';

export const AppRoute = () =>{
    let routes= useRoutes([
      {path:'/',element:<Navigate to={PUBLIC_PREFIX_PATH} />},
      {path:PUBLIC_PREFIX_PATH,element:<HomeView/>},
      {path:`${PUBLIC_PREFIX_PATH}/explore`,element:<ExploreView />},
      {path:`${PUBLIC_PREFIX_PATH}/explore/singleCard`,element:<SingleCardView/>},
      {path:`${AUTH_PREFIX_PATH}/profile`,element:<ProfileView/>},
      {path:`${PUBLIC_PREFIX_PATH}/itemlist`,element:<NewContent/>},
      {path:`${PUBLIC_PREFIX_PATH}/sell`,element:<SellPage/>}
    ]);
    return routes;
}