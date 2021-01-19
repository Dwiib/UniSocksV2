import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'
import { ButtonLight } from '../../components/Button'
import Unisocks1img from '../../assets/images/unisocks1.png'

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
const InputField = styled.input`
  width: 100%;
  height: 36px;
  padding: 15px;
  margin: 6px 0;
  font-size: 1rem;
  color: #333333;
  border: none;
  border-radius: .4rem;
  outline: none;
`
const ModalHeader = styled.div`
  display: flex;
  width: min-content;
`

const SwapTitle = styled.h1`
  color: #FF007A;
  font-weight: 600;
  text-align: left;
  margin-bottom: 0;
  margin-top: 0;
`

const ImageTop = styled.img`
  width: 100%;
`


/**
 * Content for balance stats modal
 */
export default function SocksBalanceContent({ setShowSocksRedeemModal }: { setShowSocksRedeemModal: any }) {

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
          <ModalHeader>
            <ImageTop src={Unisocks1img} />
            <SwapTitle>Unisocks Edition 0</SwapTitle>
          </ModalHeader>
            <RowBetween>
            <form>
              <label><TYPE.white color="white">Where should we send them?</TYPE.white>
              <InputField placeholder="Name and surname"></InputField>
              <InputField placeholder="Address Line 1"></InputField>
              <InputField placeholder="City"></InputField>
              <InputField placeholder="State/Province/Region"></InputField>
              <InputField placeholder="ZIP/Postcode"></InputField>
              <InputField placeholder="Country"></InputField>
              <InputField placeholder="Email address"></InputField>
              </label>
            </form>
            </RowBetween>
            <ButtonLight>Confirm purchase</ButtonLight>
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
