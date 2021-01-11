import React from 'react'
import Unisocks1img from '../../assets/images/unisocks1.png'
import styled from 'styled-components'

const SocksImage = {
  width: "100%",
};

const SocksContainer = {
  padding: "30px",
};

const SocksPrice = styled.div`
  color: #FF007A;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`
const SocksStats = styled.div`
  display: flex;
  flex-direction: row;
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
    <div style={SocksContainer}>
        <img style={SocksImage} src={Unisocks1img} />
      <SocksPrice>$ PRICE HERE USD</SocksPrice>
      <SocksStats>
        <SocksStatsRedeem>🔥123 redeemed</SocksStatsRedeem>
        <SocksStatsAvailable>123 Available</SocksStatsAvailable>
      </SocksStats>
    </div>
  )
}
