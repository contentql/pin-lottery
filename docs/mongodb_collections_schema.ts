const collections = [
  {
    name: 'how_it_work',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'title', type: 'String' },
      { name: 'desc', type: 'String' },
      { name: 'icon', type: 'String' },
    ],
  },
  {
    name: 'affiliate_partner',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'title', type: 'String' },
      { name: 'desc', type: 'String' },
      { name: 'icon', type: 'String' },
    ],
  },
  {
    name: 'top_affiliate',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'name', type: 'String' },
      { name: 'earn', type: 'String' },
      { name: 'img', type: 'String' },
    ],
  },
  {
    name: 'clients',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'img', type: 'String' },
    ],
  },
  {
    name: 'blogData',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'img', type: 'String' },
      { name: 'title', type: 'String' },
      { name: 'comments', type: 'Number' },
      { name: 'views', type: 'Number' },
      { name: 'short_desc', type: 'String' },
      { name: 'date', type: 'String' },
      { name: 'author_name', type: 'String' },
      { name: 'author_avt', type: 'String' },
    ],
  },
  {
    name: 'cartData',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'ticket', type: 'Array of Numbers' },
    ],
  },
  {
    name: 'contestData',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'String' },
      { name: 'title', type: 'String' },
      { name: 'ticket_price', type: 'String' },
      { name: 'img', type: 'String' },
      { name: 'contest_no', type: 'String' },
      { name: 'day_remain', type: 'Number' },
      { name: 'ticket_remain', type: 'Number' },
      { name: 'tags', type: 'Array of Strings' },
    ],
  },
  {
    name: 'faqData',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'question', type: 'String' },
      { name: 'answer', type: 'String' },
    ],
  },
  {
    name: 'teamData',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'name', type: 'String' },
      { name: 'title', type: 'String' },
      { name: 'img', type: 'String' },
    ],
  },
  {
    name: 'testimonialData',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'img', type: 'String' },
      { name: 'name', type: 'String' },
      { name: 'comment', type: 'String' },
    ],
  },
  {
    name: 'postDrawData',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'String' },
      { name: 'draw', type: 'String' },
      { name: 'contest_no', type: 'String' },
      { name: 'result', type: 'String' },
      { name: 'status', type: 'Boolean' },
    ],
  },
  {
    name: 'allTransactions',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'Number' },
      { name: 'date', type: 'String' },
      { name: 'month', type: 'String' },
      { name: 'description', type: 'String' },
      { name: 'referral', type: 'String' },
      { name: 'pay_method', type: 'String' },
      { name: 'amount', type: 'String' },
      { name: 'transaction', type: 'String' },
      { name: 'status', type: 'Number' },
    ],
  },
  {
    name: 'winnerData',
    fields: [
      { name: '_id', type: 'ObjectId' },
      { name: 'id', type: 'String' },
      { name: 'title', type: 'String' },
      { name: 'draw_at', type: 'String' },
      { name: 'winning_number', type: 'Array of Numbers' },
      { name: 'contest_no', type: 'String' },
      { name: 'winer_img', type: 'String' },
      { name: 'winning_price_img', type: 'String' },
    ],
  },
]
