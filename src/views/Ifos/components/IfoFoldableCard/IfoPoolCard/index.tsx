import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { ContextApi } from 'contexts/Localization/types'
import { Box, Card, CardBody, CardHeader, Flex, HelpIcon, Text, useTooltip } from '@pancakeswap/uikit'
import { Ifo, PoolIds } from 'config/constants/types'
import { useProfile } from 'state/profile/hooks'
import { PublicIfoData, WalletIfoData } from 'views/Ifos/types'
import { EnableStatus } from '../types'
import IfoCardTokens from './IfoCardTokens'
import IfoCardActions from './IfoCardActions'
import IfoCardDetails from './IfoCardDetails'
import '../styles.css'

const StyledCard = styled(Card)`
  background: transparent;
  max-width: 368px;
  width: 100%;
  margin: 0 auto;
  height: fit-content;

`

interface IfoCardProps {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  onApprove: () => Promise<any>
  enableStatus: EnableStatus
}

const cardConfig = (
  t: ContextApi['t'],
  poolId: PoolIds,
): {
  title: string
  // variant:  'default',
  tooltip: string
} => {
  switch (poolId) {
    case PoolIds.poolBasic:
      return {
        title: t('BNB Sacrifice'),
        // variant: 'default',
        tooltip: t(
          'Every person can only commit a limited amount, but may expect a higher return per token committed.',
        ),
      }
    case PoolIds.poolUnlimited:
      return {
        title: t('LUSI Sacrifice'),
        //  variant: 'default',
        tooltip: t('No limits on the amount you can commit. Additional fee applies when claiming.'),
      }
    default:
      return { title: '', tooltip: '' }
  }
}
// variant: 'default'
const SmallCard: React.FC<IfoCardProps> = ({ poolId, ifo, publicIfoData, walletIfoData, onApprove, enableStatus }) => {
  const { t } = useTranslation()
  const config = cardConfig(t, poolId)
  const { hasProfile, isLoading: isProfileLoading } = useProfile()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(config.tooltip, { placement: 'bottom' })

  const isLoading = isProfileLoading || publicIfoData.status === 'idle'

  return (
    <>
      {tooltipVisible && tooltip}
      <div className='glass' >
        <div className='_header_card2'  >
          <Flex justifyContent="space-between" alignItems="center">
            <Text bold fontSize="20px" lineHeight={1}>
              {config.title}
            </Text>
            <div ref={targetRef}>
              <HelpIcon />
            </div>
          </Flex>
        </div>
        <CardBody className='transparent ' p="12px">
          <IfoCardTokens
            poolId={poolId}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            hasProfile={hasProfile}
            isLoading={isLoading}
            onApprove={onApprove}
            enableStatus={enableStatus}
          />
          <Box mt="24px">
            <IfoCardActions
              poolId={poolId}
              ifo={ifo}
              publicIfoData={publicIfoData}
              walletIfoData={walletIfoData}
              hasProfile={hasProfile}
              isLoading={isLoading}
            />
          
          </Box>
          <IfoCardDetails poolId={poolId} ifo={ifo} publicIfoData={publicIfoData} walletIfoData={walletIfoData} />
        </CardBody>
      </div>
    </>
  )
}

export default SmallCard
