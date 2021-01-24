import React, { useState } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'
import { ButtonLight } from '../../components/Button'
import Unisocks1img from '../../assets/images/unisocks1.png'
import Checkmark from '../../assets/images/checkmark.png'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
  overflow: scroll;
`
const ModalRedeem = styled(DataCard)`
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

const ImageCheckmark = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  margin-top: 30px;
`
const RedeemedTitle = styled.h1`
  text-align: center;
  color: #FF007A;
`
const formShowing = false

const nameSurname = 'nameSurname'
const addressLine1 = 'addressLine1'
const city = 'city'
const stateProvinceRegion = 'stateProvinceRegion'
const zipPostCode = 'zipPostCode'
const country = 'country'
const emailAddress = 'emailAddress'

const nameMap = {
  [nameSurname]: 'Name and Surname',
  [addressLine1]: 'Address Line 1',
  [city]: 'City',
  [stateProvinceRegion]: 'State / Province / Region',
  [zipPostCode]: 'Zip / Post Code',
  [country]: 'Country',
  [emailAddress]: 'Email Address'
}


const defaultState = {
  [nameSurname]: '',
  [addressLine1]: '',
  [city]: '',
  [stateProvinceRegion]: '',
  [zipPostCode]: '',
  [country]: '',
  [emailAddress]: ''
}


/**
 * Content for balance stats modal
 */
export default function SocksBalanceContent({ setShowSocksRedeemModal }: { setShowSocksRedeemModal: any }) {

  const [formState, setFormState] = useState(defaultState)
   
  function handleChange(event: { target: { name: any; value: any } }) {
    const { name, value } = event.target
    setFormState(state => ({ ...state, [name]: value }))
  }
  let formData = {formName:`${formState[nameSurname]}`, formAddress:`${formState[addressLine1]}`, formCity:`${formState[city]}`, stateProvinceRegionFromForm:`${formState[stateProvinceRegion]}`, formZipPostCode:`${formState[zipPostCode]}`, formCountry:`${formState[country]}`, formEmailAddress:`${formState[emailAddress]}`}
  return (
    <ContentWrapper gap="lg">
    <div hidden={formShowing}>
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
            <TYPE.white color="white">🧦 Socks QTY</TYPE.white>
            <TYPE.white color="white">NUM</TYPE.white>
            </RowBetween>
              <RowBetween>
              <form>
                <label><TYPE.white color="white">Where should we send them?</TYPE.white>
                <InputField name={nameSurname} value={formState[nameSurname]}
                onChange={handleChange} placeholder={nameMap[nameSurname]}></InputField>
                <InputField name={addressLine1} value={formState[addressLine1]}
                onChange={handleChange} placeholder={nameMap[addressLine1]}></InputField>
                <InputField name={city} value={formState[city]}
                onChange={handleChange} placeholder={nameMap[city]}></InputField>
                <InputField name={stateProvinceRegion} value={formState[stateProvinceRegion]}
                onChange={handleChange} placeholder={nameMap[stateProvinceRegion]}></InputField>
                <InputField name={zipPostCode} value={formState[zipPostCode]}
                onChange={handleChange} placeholder={nameMap[zipPostCode]}></InputField>
                <InputField name={country} value={formState[country]}
                onChange={handleChange} placeholder={nameMap[country]}></InputField>
                <InputField name={emailAddress} value={formState[emailAddress]}
                onChange={handleChange} placeholder={nameMap[emailAddress]}></InputField>
                </label>
              </form>
              </RowBetween>
              <ButtonLight onClick={()=>{console.log(formData)}}>Confirm purchase</ButtonLight>
            </AutoColumn>
          </CardSection>
          </ModalUpper>
        </div>
        <div>
        <ModalRedeem>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">🦄 Redeem complete</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowSocksRedeemModal(false)} />
          </RowBetween>
        <AutoColumn gap="md">
          <ImageCheckmark src={Checkmark} />
          <RedeemedTitle>You got socks!</RedeemedTitle>
            <RowBetween>
              <TYPE.white color="white">The estimated shipping time is about 2-3 weeks and may vary by country.</TYPE.white>
            </RowBetween>
        </AutoColumn>
        </CardSection>
        </ModalRedeem>
        </div>
    </ContentWrapper>
  )
}
