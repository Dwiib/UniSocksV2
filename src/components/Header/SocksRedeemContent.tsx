import { ChainId } from '@uniswap/sdk'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import { SOCKS } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { ExternalLink, TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function SocksBalanceContent({ setShowSocksRedeemModal }: { setShowSocksRedeemModal: any }) {
  const { chainId } = useActiveWeb3React()
  const socks = chainId ? SOCKS : undefined

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">🦄 Pay/Shipping details</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowSocksRedeemModal(false)} />
          </RowBetween>
        </CardSection>

        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
            <form>
              <label>Where should we send them?
              <input placeholder="Name"></input>
              </label>
            </form>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">🔥 Redeem SOCKS</TYPE.white>
              <TYPE.white color="white">NUM</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">💦 SOCKS Pool</TYPE.white>
              <TYPE.white color="white">NUM</TYPE.white>
            </RowBetween>
            {socks && socks.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://uniswap.info/token/${socks.address}`}><TYPE.white color="white">View 🧦 Analytics</TYPE.white></ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
