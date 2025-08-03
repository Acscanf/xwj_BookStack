// search 全局共享状态
import { create } from "zustand";
import { getSuggestList } from "@/api/search";

const useSearchStore = create((set, get) => {
  // 初始数据格式改为 { text: string, timestamp: number }[]
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [
    { text: "红楼梦的作者是谁", timestamp: 1 },
    { text: "四大名著是什么", timestamp: 2 },
    { text: "西游记经历了多少难", timestamp: 3 },
  ];

  return {
    searchHistory,
    suggestList: [], // suggest 返回 list
    setSuggestList: async (keyword) => {
      const res = await getSuggestList(keyword);
      set({
        suggestList: res.data,
      });
    },
    addSearchHistory: (keyword) => {
      const newItem = { text: keyword, timestamp: Date.now() };
      set({
        searchHistory: [newItem, ...get().searchHistory],
      });
      localStorage.setItem(
        "searchHistory",
        JSON.stringify([newItem, ...get().searchHistory])
      );
    },
    removeSearchHistory: () => {
      set({
        searchHistory: [],
      });
      localStorage.setItem("searchHistory", JSON.stringify([]));
    },
    deleteSearchHistory: (timestamp) => {
      const newHistory = get().searchHistory.filter(
        (item) => item.timestamp !== timestamp
      );
      set({
        searchHistory: newHistory,
      });
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    },
  };
});

export default useSearchStore;
