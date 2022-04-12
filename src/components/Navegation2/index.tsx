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
        <div className='header__aside'>
            <Link to="/ifo3">
                <Button className="titulo__header transparent" > {t('BNB Sacrifice')}</Button>
            </Link>
            <Link to="/ifos2">
                <Button className="titulo__header transparent" >{t('LUSI Sacrifice')}</Button>
            </Link> 
        </div>

    );
}