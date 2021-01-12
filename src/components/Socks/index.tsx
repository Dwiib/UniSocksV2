import React from 'react'
import Unisocks1img from '../../assets/images/unisocks1.png'
import styled from 'styled-components'

const SocksImage = {
  width: "100%",
};

const SocksContainer = styled.div`
  padding: 30px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
    padding-bottom: 30px;
    text-align: center;
  `};
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
  return (
    <SocksContainer>
        <img style={SocksImage} src={Unisocks1img} />
      <SocksPrice>$ PRICE HERE USD</SocksPrice>
      <SocksStats>
        <SocksStatsRedeem>🔥123 redeemed</SocksStatsRedeem>
        <SocksStatsAvailable>123 Available</SocksStatsAvailable>
      </SocksStats>
    </SocksContainer>
  )
}
