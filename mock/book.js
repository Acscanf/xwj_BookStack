import Mock from "mockjs";

// 每页10
const getBook = (page, pageSize = 10) => {
  return Array.from({ length: pageSize }, (_, index) => ({
    // 索引唯一
    id: `${page}-${index}`,
    height: Mock.Random.integer(260, 430),
    title: Mock.Random.ctitle(3, 5), // 生成3-5个中文汉字作为书名
    rating: Mock.Random.float(1, 10, 0, 1), // 1~10分，保留1位小数
    description: Mock.Random.csentence(10, 19), // 10~19个字的书本简介
    url: function () {
      const width = Mock.Random.integer(200, 500); // 随机宽度
      const height = Mock.Random.integer(300, 600); // 随机高度
      return `https://picsum.photos/${width}/${height}`; // 使用Lorem Picsum服务
    },
  }));
};

export default [
  {
    // ?page=1  queryString
    url: "/api/book",
    method: "get",
    timeout: 500,
    response: ({ query }) => {
      const page = Number(query.page) || 2; // 获取页码，默认为2，第一页我自己设计了
      return {
        code: 0,
        data: getBook(page),
      };
    },
  },
];
