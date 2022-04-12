import styled from 'styled-components'
import { Box } from '@pancakeswap/uikit'

const Card = styled(Box)<{
  width?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  padding: ${({ padding }) => padding ?? '1.25rem'};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius ?? '16px'};
  background-color: rgba(255,255,255,0.1);
  
`
export default Card

export const LightCard = styled(Card)`
  border: solid 2px rgba(199, 194, 194, 0.74);
  background-color: rgba(255,255,255,0.1);
`

export const LightGreyCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  
`

export const GreyCard = styled(Card)`
  background-color: rgba(255,255,255,0.1);
`
