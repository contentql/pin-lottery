export const isThresholdReached = (
  productPrice: number,
  ticketPrice: number,
  totalTicketsSold: number,
): boolean => {
  if (!productPrice || !ticketPrice || !totalTicketsSold) {
    return false
  }

  const totalRevenue = totalTicketsSold * ticketPrice

  return totalRevenue >= productPrice
}
