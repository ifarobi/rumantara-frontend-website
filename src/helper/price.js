import numeral from 'numeral'

numeral.register('locale', 'id', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousands: 'rb',
    million: 'jt'
  },
  currency: {
    symbol: 'Rp '
  }
})

export const price = (number, locale = 'id') => {
  numeral.locale(locale)
  return numeral(number).format("$0,0")
}
