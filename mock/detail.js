import Mock from "mockjs";

export default [
  {
    url: "/api/detail/:id",
    method: "get",
    timeout: 1000,
    response: (req, res) => {
      const randomData = Mock.mock({
        author: "@cname(2,3)", // 2-3个汉字的中文名（如"张三"、"李小明"）
        readers: "@float(10, 50, 1, 1)", // 10-50之间的随机数，保留1位小数
        wordCount: "@float(10, 100, 1, 1)", // 10-100之间的随机数，保留1位小数
        description: "@cword(80, 110)", // 简介
      });

      return {
        code: 0,
        data: randomData,
      };
    },
  },
];
