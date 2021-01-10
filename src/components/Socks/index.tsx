import React from 'react'
import Unisocks1raw from '../../assets/images/unisocks1.png'
import styled from 'styled-components'

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
`

const SocksPrice = styled.div`
  color: #FF007A;
  font-size: 2rem;
`
const SocksStats = styled.div`
  display: flex;
  flex-direction: row;
`
const SocksStatsRedeem = styled.div`
  color: #FF007A;
  font-size: 1rem;
`
const SocksStatsAvailable = styled.div`
  color: #565A69;
  font-size: 1rem;
`

export default function Socks() {
  return (
    <div>
      <ImageContainer>
        <Unisocks1raw/>
        </ImageContainer>
      <SocksPrice>PRICE HERE USD</SocksPrice>
      <SocksStats>
        <SocksStatsRedeem>123 Redeem</SocksStatsRedeem>
        <SocksStatsAvailable>123 Available</SocksStatsAvailable>
      </SocksStats>
    </div>
  )
}
