import { ChainId, TokenAmount } from '@uniswap/sdk'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/socks-logo.png'
import { SOCKS } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { ExternalLink, TYPE, UniTokenAnimated } from '../../theme'
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
export default function SocksBalanceContent({ setShowSocksStatsModal }: { setShowSocksStatsModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const socks = chainId ? SOCKS : undefined
  const totalSupply: TokenAmount | undefined = useTotalSupply(socks)

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">SOCKS Stats</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowSocksStatsModal(false)} />
          </RowBetween>
        </CardSection>
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <UniTokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {totalSupply?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
              </AutoColumn>
            </CardSection>
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">🧦 Initial SOCKS</TYPE.white>
              <TYPE.white color="white">NUM</TYPE.white>
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
