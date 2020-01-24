/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFuforeTickets = `query GetFuforeTickets($id: ID!) {
  getFuforeTickets(id: $id) {
    date
    deviceName
    fee
    id
    itemType
    receiptType
  }
}
`;
export const listFuforeTicketss = `query ListFuforeTicketss(
  $filter: ModelFuforeTicketsFilterInput
  $limit: Int
  $nextToken: String
) {
  listFuforeTicketss(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
