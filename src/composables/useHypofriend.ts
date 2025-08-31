import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'
import type {  RatesTableParams, RatesTableResponse } from '../types/types'
import { YEARS } from '../utils/constants'

const httpLink = new HttpLink({
  uri: '/graphql',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

const RATES_TABLE_QUERY = gql`
  query GetRatesTable($price: Float!, $repayment: Float!, $loanAmount: Float!, $years: [Int!]!) {
    root {
      ratesTable: rates_table(
        property_price: $price
        repayment: $repayment
        loan_amount: $loanAmount
        years_fixed: $years
      )
    }
  }
`



export function useHypofriend() {
  const fetchRatesTable = async (params: RatesTableParams): Promise<RatesTableResponse | null> => {
    try {
      const { propertyPrice, repaymentRate, impliedLoanAmount } = params

      const { data } = await client.query<RatesTableResponse>({
        query: RATES_TABLE_QUERY,
        variables: {
          price: propertyPrice,
          repayment: repaymentRate,
          loanAmount: impliedLoanAmount,
          years: YEARS,
        },
      })

      return data || null
    } catch (error) {
      console.error('GraphQL Error:', error)
      return null
    }
  }

  return {
    fetchRatesTable,

  }
}
