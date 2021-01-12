import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Swap from './Swap'
import { RedirectPathToSwapOnly} from './Swap/redirects'
import Product from '../components/Product'


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const SwapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    flex-wrap: wrap;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const SwapHeader = styled.div`
`
const SwapTitle = styled.h1`
  color: #FF007A;
  font-weight: 600;
  text-align: left;
  margin-bottom: 0;
  margin-top: 0;
`
const SwapSubTitle = styled.p`
  color: #C3C5CB;
  font-weight: 400;
  margin-top: 0.5rem;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <URLWarning />
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
        <Product/>
        <SwapWrapper>
          <SwapHeader>
            <SwapTitle>Unisocks Edition 0</SwapTitle>
            <SwapSubTitle>$SOCKS</SwapSubTitle>
          </SwapHeader>
          <Popups />
          <Polling />
          <TopLevelModals />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/swap" component={Swap} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
          </SwapWrapper>
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}
