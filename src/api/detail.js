import axios from "./config";

// 获取详情
export const getDetail = async (id) => {
  return axios.get(`/detail/${id}`);
};
