import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ExpandableLabel,
  ExpandableButton,
  useMatchBreakpoints,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import {  Route } from 'react-router-dom'



import { ToastDescriptionWithTx } from 'components/Toast'
import { Ifo, PoolIds } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { useFastFresh } from 'hooks/useRefresh'
import useToast from 'hooks/useToast'
import React, { useEffect, useState } from 'react'
import { useBlock } from 'state/block/hooks'
import styled from 'styled-components'
import { PublicIfoData, WalletIfoData } from 'views/Ifos/types'
import useIsWindowVisible from '../../../../hooks/useIsWindowVisible'
import useIfoApprove from '../../hooks/useIfoApprove'
import IfoAchievement from './Achievement'
import IfoPoolCard from './IfoPoolCard'
import { EnableStatus } from './types'
import { IfoRibbon } from './IfoRibbon'
import Swap from '../../../Page'
import './styles.css'
import Navegation2 from '../../../../components/Navegation2'


interface IfoFoldableCardProps {
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
}

const StyledCard = styled(Card)<{ $isCurrent?: boolean }>`
  width: 100%;
  margin: auto;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;

  ${({ $isCurrent }) =>
    $isCurrent &&
    `
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  > div {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  `}

  > div {
    background: transparent!important;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;

    > div {
      border-top-left-radius: 32px;
      border-top-right-radius: 32px;
    }
  }
`

const Header = styled(CardHeader)<{ ifoId: string; $isCurrent?: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: ${({ $isCurrent }) => ($isCurrent ? '64px' : '112px')};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 112px;
  }
`
// background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.svg'), url('/images/ifos/${ifoId}-bg.png')`};

const CardsWrapper = styled.div<{ singleCard: boolean }>`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: ${({ singleCard }) => (singleCard ? '1fr' : '1fr 1fr')};
    justify-items: ${({ singleCard }) => (singleCard ? 'center' : 'unset')};
  }
  background: transparent;
`

const StyledCardBody = styled(CardBody)`
  padding: 24px 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 24px;
  }
  background: red;
`

const StyledCardFooter = styled(CardFooter)`
  padding: 0;
  background: transparent;
  text-align: center;
`

const StyledNoHatBunny = styled.div<{ $isLive: boolean; $isCurrent?: boolean }>`
  position: absolute;
  left: -24px;
  z-index: 1;
  top: 33px;

  > img {
    width: 78px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    top: ${({ $isLive }) => ($isLive ? '46px' : '33px')};
  }
  ${({ theme }) => theme.mediaQueries.md} {
    left: auto;
    top: ${({ $isLive }) => ($isLive ? '61px' : '48px')};
    right: ${({ $isCurrent }) => ($isCurrent ? '17px' : '90px')};

    > img {
      width: 80px;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    right: ${({ $isCurrent }) => ($isCurrent ? '67px' : '90px')};
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    right: 90px;
  }
`

const NoHatBunny = ({ isLive, isCurrent }: { isLive?: boolean; isCurrent?: boolean }) => {
  const { isXs, isSm, isMd } = useMatchBreakpoints()
  const isSmallerThanTablet = isXs || isSm || isMd
  if (isSmallerThanTablet && isLive) return null
  return (
    <StyledNoHatBunny $isLive={isLive} $isCurrent={isCurrent}>
      <img
        src={`/images/ifos/assets/bunnypop-${!isSmallerThanTablet ? 'right' : 'left'}.png`}
        width={123}
        height={162}
        alt="bunny"
      />
    </StyledNoHatBunny>
  )
}

// Active Ifo
export const IfoCurrentCard = ({
  ifo,
  publicIfoData,
  walletIfoData,
}: {
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const shouldShowBunny = publicIfoData.status === 'live' || publicIfoData.status === 'coming_soon'

  return (
    <>
      {isMobile && (
        <Box 
          className="sticky-header"
          bottom="48px"
          width="100%"
          maxWidth={['400px', '400px', '400px', '100%']}
        >
          {/* <Header $isCurrent ifoId={ifo.id} /> */}
          <IfoRibbon publicIfoData={publicIfoData} />
          {shouldShowBunny && <NoHatBunny isLive={publicIfoData.status === 'live'} />}
         
        </Box>
      )}
      
      <Box className='glass' position="relative" width="100%" maxWidth={['400px', '400px', '400px', '100%']}>
        {!isMobile && shouldShowBunny && <NoHatBunny isCurrent isLive={publicIfoData.status === 'live'} />}
        <StyledCard className='transparent'  $isCurrent>
          {!isMobile && (
            <div className='_header_card'>
              {/* <Header $isCurrent ifoId={ifo.id} /> */}
              <IfoRibbon publicIfoData={publicIfoData} />
            </div>
          )}
          <IfoCard  ifo={ifo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} />
          <StyledCardFooter className='transparent '>
            <ExpandableLabel expanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? t('Hide') : t('Details')}
            </ExpandableLabel>
            {isExpanded && <IfoAchievement ifo={ifo} publicIfoData={publicIfoData} />}
          </StyledCardFooter>
        </StyledCard>
      </Box>
      
    </>
  )
}

const FoldableContent = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`

// Past Ifo
const IfoFoldableCard = ({
  ifo,
  publicIfoData,
  walletIfoData,
}: {
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { isDesktop } = useMatchBreakpoints()

  return (
    <Box position="relative">
      {isExpanded && isDesktop && <NoHatBunny isLive={false} />}
      <Box as={StyledCard} borderRadius="32px">
        <Box position="relative">
          <Header ifoId={ifo.id}>
            <ExpandableButton expanded={isExpanded} onClick={() => setIsExpanded((prev) => !prev)} />
          </Header>
          {isExpanded && (
            <>
              <IfoRibbon publicIfoData={publicIfoData} />
            </>
          )}
        </Box>
        <FoldableContent isVisible={isExpanded}>
          <IfoCard ifo={ifo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} />
          <IfoAchievement ifo={ifo} publicIfoData={publicIfoData} />
        </FoldableContent>
      </Box>
    </Box>
  )
}

const IfoCard: React.FC<IfoFoldableCardProps> = ({ ifo, publicIfoData, walletIfoData }) => {
  const { currentBlock } = useBlock()
  const { fetchIfoData: fetchPublicIfoData, isInitialized: isPublicIfoDataInitialized, secondsUntilEnd } = publicIfoData
  const {
    contract,
    fetchIfoData: fetchWalletIfoData,
    resetIfoData: resetWalletIfoData,
    isInitialized: isWalletDataInitialized,
  } = walletIfoData
  const [enableStatus, setEnableStatus] = useState(EnableStatus.DISABLED)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const raisingTokenContract = useERC20(ifo.currency.address)
  // Continue to fetch 2 more minutes to get latest data
  const isRecentlyActive =
    (publicIfoData.status !== 'finished' || (publicIfoData.status === 'finished' && secondsUntilEnd >= -120)) &&
    ifo.isActive
  const onApprove = useIfoApprove(raisingTokenContract, contract.address)
  const { toastSuccess, toastError } = useToast()
  const fastRefresh = useFastFresh()
  const isWindowVisible = useIsWindowVisible()

  useEffect(() => {
    if (isRecentlyActive || !isPublicIfoDataInitialized) {
      fetchPublicIfoData(currentBlock)
    }
  }, [isRecentlyActive, isPublicIfoDataInitialized, fetchPublicIfoData, currentBlock])

  useEffect(() => {
    if (isWindowVisible && (isRecentlyActive || !isWalletDataInitialized)) {
      if (account) {
        fetchWalletIfoData()
      }
    }

    if (!account && isWalletDataInitialized) {
      resetWalletIfoData()
    }
  }, [
    isWindowVisible,
    account,
    isRecentlyActive,
    isWalletDataInitialized,
    fetchWalletIfoData,
    resetWalletIfoData,
    fastRefresh,
  ])

  const handleApprove = async () => {
    try {
      setEnableStatus(EnableStatus.IS_ENABLING)
      await onApprove(
        (tx) => {
          toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
        },
        (receipt) => {
          toastSuccess(
            t('Successfully Enabled!'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('You can now participate in the %symbol% IFO.', { symbol: ifo.token.symbol })}
            </ToastDescriptionWithTx>,
          )
        },
        (receipt) => {
          toastError(
            t('Error'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('Please try again. Confirm the transaction and make sure you are paying enough gas!')}
            </ToastDescriptionWithTx>,
          )
        },
      )
      setEnableStatus(EnableStatus.ENABLED)
    } catch (error) {
      setEnableStatus(EnableStatus.DISABLED)
    }
  }

  useEffect(() => {
    const checkAllowance = async () => {
      try {
        const response = await raisingTokenContract.allowance(account, contract.address)
        const currentAllowance = new BigNumber(response.toString())
        setEnableStatus(currentAllowance.lte(0) ? EnableStatus.DISABLED : EnableStatus.ENABLED)
      } catch (error) {
        setEnableStatus(EnableStatus.DISABLED)
      }
    }

    if (account) {
      checkAllowance()
    }
  }, [account, raisingTokenContract, contract, setEnableStatus])

  return (
    
    
    <div className='transparent'>
    <Navegation2 />
      <div className='transparent'>
        <CardsWrapper className='transparent change' singleCard={!publicIfoData.poolBasic || !walletIfoData.poolBasic}>
          {publicIfoData.poolBasic && walletIfoData.poolBasic && (
            <IfoPoolCard
              poolId={PoolIds.poolBasic}
              ifo={ifo}
              publicIfoData={publicIfoData}
              walletIfoData={walletIfoData}
              onApprove={handleApprove}
              enableStatus={enableStatus}
            />
          )}
          {/* <IfoPoolCard
            poolId={PoolIds.poolUnlimited}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            onApprove={handleApprove}
            enableStatus={enableStatus}
          /> */}
        </CardsWrapper>
      </div>
    </div>
    
  )
}

export default IfoFoldableCard
