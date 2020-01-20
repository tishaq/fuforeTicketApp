/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTicket = `subscription OnCreateTicket(
  $deviceName: String
  $fee: Int
  $id: ID
  $itemType: String
  $receiptType: String
) {
  onCreateTicket(
    deviceName: $deviceName
    fee: $fee
    id: $id
    itemType: $itemType
    receiptType: $receiptType
  ) {
    date
    deviceName
    fee
    id
    itemType
    receiptType
  }
}
`;
export const onDeleteTicket = `subscription OnDeleteTicket(
  $deviceName: String
  $fee: Int
  $id: ID
  $itemType: String
  $receiptType: String
) {
  onDeleteTicket(
    deviceName: $deviceName
    fee: $fee
    id: $id
    itemType: $itemType
    receiptType: $receiptType
  ) {
    date
    deviceName
    fee
    id
    itemType
    receiptType
  }
}
`;
export const onUpdateTicket = `subscription OnUpdateTicket(
  $deviceName: String
  $fee: Int
  $id: ID
  $itemType: String
  $receiptType: String
) {
  onUpdateTicket(
    deviceName: $deviceName
    fee: $fee
    id: $id
    itemType: $itemType
    receiptType: $receiptType
  ) {
    date
    deviceName
    fee
    id
    itemType
    receiptType
  }
}
`;
