import React from 'react'
import { TokenAmount } from '@uniswap/sdk'
import { useActiveWeb3React } from '../../hooks'
import Unisocks1img from '../../assets/images/unisocks1.png'
import { SOCKS } from '../../constants'
import styled from 'styled-components'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { useTotalSupply } from '../../data/TotalSupply'


const SocksContainer = styled.div`
  padding: 30px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
    padding-bottom: 30px;
    text-align: center;
  `};
`

const ImageTop = styled.img`
  width: 100%;
`
const SocksPrice = styled.div`
  color: #FF007A;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`
const SocksStats = styled.div`
  display: flex;
  flex-direction: row;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: center;
  `};
`
const SocksStatsRedeem = styled.div`
  color: #FF007A;
  font-size: 1rem;
  font-weight: 600;
`
const SocksStatsAvailable = styled.div`
  color: #565A69;
  font-size: 1rem;
  font-weight: 600;
  align-self: center;
  margin-left: 1rem;
`

export default function Socks() {
  const { chainId } = useActiveWeb3React()
  const socks = chainId ? SOCKS : undefined
  const socksPrice = useUSDCPrice(socks)
  const totalSupply: TokenAmount | undefined = useTotalSupply(socks)


  return (
    <SocksContainer>
        <ImageTop src={Unisocks1img} />
      <SocksPrice>Current SOCKS Price: ${socksPrice?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? '-'}</SocksPrice>
      <SocksStats>
        <SocksStatsRedeem>🔥 {500 - Number(totalSupply?.toFixed(0, { groupSeparator: ',' }))} SOCKS Redeemed</SocksStatsRedeem>
        <SocksStatsAvailable>Currently there are {totalSupply?.toFixed(0, { groupSeparator: ',' })} SOCKS available</SocksStatsAvailable>
      </SocksStats>
    </SocksContainer>
  )
}
