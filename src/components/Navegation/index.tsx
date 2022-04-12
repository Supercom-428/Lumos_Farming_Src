import React from 'react'
import { Button } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'

export default function Navegation(){
    const { account } = useWeb3React()
    const { theme } = useTheme()
    const { t } = useTranslation()
    return (
        <div className='header__aside '>
            <Link to="/swap/0xdd05b1110147098b26fd3d457aa2992c034d3cfc">
                <Button className="titulo__header transparent" > {t('Exchange')}</Button>
            </Link>
            <Link to="/pool">
                <Button className="titulo__header transparent" >{t('Liquidity')}</Button>
            </Link> 
        </div>

    );
}