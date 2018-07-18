export default [
  {
    title: 'Amount',
    dataIndex: 'qty',
    key: 'qty',
    render: text => Math.abs(text)
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  }
];
