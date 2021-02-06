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
import { useActiveWeb3React } from '../../hooks'
import { useSocksController } from '../../hooks/useContract'
import { BigNumber, ethers } from 'ethers'

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

const qty = 'qty'
const nameSurname = 'nameSurname'
const addressLine1 = 'addressLine1'
const city = 'city'
const stateProvinceRegion = 'stateProvinceRegion'
const zipPostCode = 'zipPostCode'
const country = 'country'
const emailAddress = 'emailAddress'
const ethAddress = 'ethAddress'
const timeStamp = 'timeStamp'
const numberBurned = 'number-burned'

const nameMap = {
  [qty]: 'QTY',
  [nameSurname]: 'Name and Surname',
  [addressLine1]: 'Address Line 1',
  [city]: 'City',
  [stateProvinceRegion]: 'State / Province / Region',
  [zipPostCode]: 'Zip / Post Code',
  [country]: 'Country',
  [emailAddress]: 'Email Address',
  [ethAddress]: 'Ethereum Address',
  [timeStamp]: 'Time',
  [numberBurned]: 'SOCKS Redeemed'
}

const defaultState = {
  [qty]: 0,
  [nameSurname]: '',
  [addressLine1]: '',
  [city]: '',
  [stateProvinceRegion]: '',
  [zipPostCode]: '',
  [country]: '',
  [emailAddress]: ''
}

function encode(data: any) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export function calculateGasMargin(value: BigNumber, margin: BigNumber) {
  const offset = value.mul(margin).div(ethers.BigNumber.from(10000))
  return value.add(offset)
}

/**
 * Content for balance stats modal
 */
export default function SocksBalanceContent({ setShowSocksRedeemModal }: { setShowSocksRedeemModal: any }) {
  const { library, account } = useActiveWeb3React()
  const [formState, setFormState] = useState(defaultState)
  const signer = library.getSigner()
  const socksController = useSocksController().connect(signer)
   
  function handleChange(event: { target: { name: any; value: any } }) {
    const { name, value } = event.target
    setFormState(state => ({ ...state, [name]: value }))
  }
 
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
            <input type="number" name={qty} value={formState[qty]}
                onChange={handleChange} placeholder={nameMap[qty]}>
            </input>
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
              <ButtonLight onClick={ 
                async () => {
                  const signer = library.getSigner()
                  const timestampToSign = Math.round(Date.now() / 1000)
                  const header = `PLEASE VERIFY YOUR ADDRESS.\nYour data will never be shared publicly.`
                  const formDataMessage = `
                    ${nameMap[nameSurname]}: ${formState[nameSurname]}
                    ${nameMap[addressLine1]}: ${formState[addressLine1]}
                    ${nameMap[city]}: ${formState[city]}
                    ${nameMap[stateProvinceRegion]}: ${formState[stateProvinceRegion]}
                    ${nameMap[zipPostCode]}: ${formState[zipPostCode]}
                    ${nameMap[country]}: ${formState[country]}
                    ${nameMap[emailAddress]}: ${formState[emailAddress]}
                    ${nameMap[qty]} : ${formState[qty]}
                  `
                  const amountToBurn = formState[qty].toString()
                  const parsedAmount = ethers.utils.parseUnits(amountToBurn, 18)
                  const response = await socksController.burn(parsedAmount)

                  response.wait().then(async (rsp: any) => {
                      const autoMessage = `${nameMap[ethAddress]}: ${account}\n${nameMap[timeStamp]}: ${timestampToSign}\n${nameMap[numberBurned]}: ${amountToBurn}` // Todo: amount to burn needs to be replaced with actual burnt

                      var signature = await signer
                        .signMessage(`${header}\n\n${formDataMessage}\n${autoMessage}`)
    
                      var postResponse = await fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: encode({
                          'form-name': 'redeem',
                          ...{
                            ...formState,
                            'address': account,
                            'timestamp': timestampToSign,
                            'numberBurned': parsedAmount,
                            'signature': signature
                        }
                      })
                    })

                    if (!postResponse.ok) {
                      // TODO: Show dialog telling user to send an eamil to unisocks team
                    }
                  })
              }
              }>
                Confirm purchase
              </ButtonLight>
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
