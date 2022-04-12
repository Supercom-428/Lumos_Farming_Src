import React from "react";
import "./sidebar.css";
import { Button } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'

import { SlideSvgDark, SlideSvgLight } from '../../views/Home/components/SlideSvg'
import CompositeImage, { getSrcSet, CompositeImageProps } from '../../views/Home/components/CompositeImage'
import UserMenu from '../Menu/UserMenu';
import GlobalSettings from '../Menu/GlobalSettings';
import CurrentIfo from '../../views/Ifos/CurrentIfo'

const imageSrc = '/images/icon.png'

const imageSrc1 = '/images/lumos-logo-white.png'
const Url  ='http://localhost:3000'

function Sidebar () {
    const { account } = useWeb3React()
    const { theme } = useTheme()
    const { t } = useTranslation()
    return(
        <div className="wraper">

            <div className="sidebar">

                <div className="sidebar__colores">

                    <div className="color" />
                    <div className="color" />
                    <div className="color" />
                    <div className="color" />
                    <div className="color" />
                    <div className="color" />

                    <div className="content__sidebar">

                        <div className="icon__username">
                    <picture> 
                        {/* <source type="image/webp" srcSet={getSrcSet(imagePath, imageSrc, '.webp')} /> 
                        <source type="image/png" srcSet={getSrcSet(imagePath, imageSrc)} />  */}
                        <img src={`${imageSrc}`} alt="Avatars"  />
                    </picture>
                            <img src="./icon.png" alt="" className="user__img" />
                        </div>

                        <div className="name__user">
                            <h1 className="text__user">Metaverse Finance</h1>
                        </div>

                        <div className="contenedor__nav">

                            <div className="navegacion__principal">
                                <a href={`${Url}`} className="nav__item transparent"> <span className="nav__icon fas fa-home" /> Home</a>
                              
                                <a href="http://staking.oscarm57.sg-host.com/" className="nav__item transparent"> <span className="nav__icon fas fa-hand-holding-usd" /> Staking</a>
                                
                                <a href="http://loock.oscarm57.sg-host.com/" className="nav__item transparent"> <span className="nav__icon fas fa-lock" /> Vesting</a>
                                
                                <Link to="/farms">
                                    <Button className="nav__item transparent" ><span className="nav__icon fas fa-user-secret" /> {t('Farming')}</Button>
                                </Link>

                                {/* <Link to="">
                                    <Button className="nav__item transparent" ><span className="nav__icon fas fa-home" /> {t('Home')}</Button>
                                </Link>   */}
                                {/* <div className="w-20"> */}
                                <Link to="/swap/0xdd05b1110147098b26fd3d457aa2992c034d3cfc">
                                    <Button className="nav__item transparent" ><span className="nav__icon fas fa-retweet" /> {t('Trade')}</Button>
                                </Link>
                                {/* </div> */}

                                <Link to="/info">
                                    <Button className="nav__item transparent" > <span className="nav__icon fas fa-chart-line" />Info & Analytics</Button>
                                </Link>
                                <Link to="/info/pools">
                                    <Button className="nav__item transparent"> <span className="nav__icon fas fa-digital-tachograph" />Top Pools</Button>
                                </Link>
                                <Link to="/info/tokens">
                                    <Button className="nav__item transparent"> <span className="nav__icon fas fa-chart-bar" />Top Tokens</Button>
                                </Link>
                                {/* <Link to="/ifos2?outputCurrency=0x3282B3460Fe984bFfFEe9fBb3F1B6481D9d82A16">
                                <Button className="nav__item transparent"> <span className="nav__icon fas fa-box" />Sacrifice</Button>
                                </Link>

                                <Link to="/ifo?outputCurrency=0x3282B3460Fe984bFfFEe9fBb3F1B6481D9d82A16">
                                <Button className="nav__item transparent"> <span className="nav__icon fas fa-box" />Sacrifice-2</Button>
                                </Link> */}
                                {/* <a href="http://localhost:3000" className="nav__item"> <span className="nav__icon fas fa-home" /> Home</a> */}
                                {/* <a href="http://localhost:3000" className="nav__item"> <span className="nav__icon fas fa-home" /> Home</a>                    */}
                                {/* <a href="https://" className="nav__item"> <span className="nav__icon fas fa-retweet" /> Swap</a>
                                <a href="https://" className="nav__item"> <span className="nav__icon fas fa-user-secret" /> Farming</a>
                                <a href="https://" className="nav__item"> <span className="nav__icon fas fa-spinner" /> Staking</a>
                                <a href="https://" className="nav__item"> <span className="nav__icon fas fa-water" /> Pools</a> */}
                            </div>

                            <div className="boton btn__sidebar">
                                <a href="https://t.me/LumosMetaverse"  className="btn__link"><span className="fab fa-telegram" /> </a>
                                <a href="https://discord.gg/fgDN3hNPGV" className="btn__link"><span className="fab fa-discord" /> </a>
                                <a href="https://twitter.com/MetaverseLumos" className="btn__link"><span className="fab fa-twitter" /> </a>
                                <a href="https://lumos.world" className="btn__link">
                                <picture> 
                                    {/* <source type="image/webp" srcSet={getSrcSet(imagePath, imageSrc, '.webp')} /> 
                                    <source type="image/png" srcSet={getSrcSet(imagePath, imageSrc)} />  */}
                                    <img  src={`${imageSrc1}`} alt="lumos" id="lumos-logo" />
                                </picture>
                                     </a>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            
        </div>

        
    )
}

export default Sidebar;