import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@cparagraph(0, 1)',
    'status|1': [0, 1],
    'userstatus|1': [true, false],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)',
    'amount|1-2000': 100

  }]
})

export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
