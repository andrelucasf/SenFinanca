export function formattedCurrency(value) {
  return value.toLocaleString(`pt-BR`, {
    style: `currency`,
    currency: `BRL`,
    minimumFractionDigits: 2,
  })
}