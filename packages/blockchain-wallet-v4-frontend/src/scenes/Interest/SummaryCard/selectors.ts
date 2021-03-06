import { lift } from 'ramda'

import {
  ExtractSuccess,
  FiatType,
  SupportedWalletCurrenciesType
} from 'blockchain-wallet-v4/src/types'
import { selectors } from 'data'

export const getData = state => {
  const interestAccountBalanceR = selectors.components.interest.getInterestAccountBalance(
    state
  )
  const interestEligibleR = selectors.components.interest.getInterestEligible(
    state
  )
  const showInterestInfoBox = selectors.preferences.getShowInterestInfoBox(
    state
  ) as boolean
  const supportedCoinsR = selectors.core.walletOptions.getSupportedCoins(state)
  const walletCurrencyR = selectors.core.settings.getCurrency(state)

  const transform = (
    interestAccountBalance: ExtractSuccess<typeof interestAccountBalanceR>,
    interestEligible: ExtractSuccess<typeof interestEligibleR>,
    supportedCoins: SupportedWalletCurrenciesType,
    walletCurrency: FiatType
  ) => ({
    interestAccountBalance,
    interestEligible,
    showInterestInfoBox,
    supportedCoins,
    walletCurrency
  })

  return lift(transform)(
    interestAccountBalanceR,
    interestEligibleR,
    supportedCoinsR,
    walletCurrencyR
  )
}
