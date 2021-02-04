import { ChainId, TokenAmount } from '@uniswap/sdk'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/socks-logo.png'
import { SOCKS } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { ExternalLink, StyledInternalLink, TYPE, UniTokenAnimated } from '../../theme'
import useUSDCPrice from '../../utils/useUSDCPrice'
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

  const socksPrice = useUSDCPrice(socks)

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md" style={{justifySelf: "center"}}>
          <RowBetween>
            <TYPE.white color="white">Your 🧦 Stats</TYPE.white>
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
              <TYPE.white color="white">🧦 Price:
</TYPE.white>
<TYPE.white color="white">${socksPrice?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
            <TYPE.white color="white">🧦 Available</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">🧦 Redeemed</TYPE.white>
              <TYPE.white color="white">🔥{500 - Number(totalSupply?.toFixed(0, { groupSeparator: ',' }))}</TYPE.white>
            </RowBetween>
            <RowBetween>
            <StyledInternalLink onClick={() => setShowSocksStatsModal(false)} to="/swap?exactField=output&outputCurrency=0x23b608675a2b2fb1890d3abbd85c5775c51691d5">
              <TYPE.white color="white">BUY</TYPE.white>
            </StyledInternalLink>
            <ExternalLink href="https://unisocks.exchange">
              <TYPE.white color="white">REDEEM</TYPE.white>
            </ExternalLink>
            <StyledInternalLink onClick={() => setShowSocksStatsModal(false)} to="/swap?exactField=input&inputCurrency=0x23b608675a2b2fb1890d3abbd85c5775c51691d5">
              <TYPE.white color="white">SELL</TYPE.white>
            </StyledInternalLink>
            </RowBetween>
            {socks && socks.chainId === ChainId.MAINNET ? (
              <ExternalLink style={{justifySelf: "center", marginTop: "10px"}} href={`https://uniswap.info/token/${socks.address}`}><TYPE.white color="white">View 🧦 Analytics</TYPE.white></ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
