/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTicket = `query GetTicket($id: ID!) {
  getTicket(id: $id) {
    date
    deviceName
    fee
    id
    itemType
    receiptType
  }
}
`;
export const listTickets = `query ListTickets(
  $filter: TableTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      date
      deviceName
      fee
      id
      itemType
      receiptType
    }
    nextToken
  }
}
`;
