import { create } from "zustand";
import { persist } from "zustand/middleware";  // 导入持久化中间件

const useShelfStore = create(
  persist(
    (set) => ({
      shelf: [],
      // 新增方法检查特定书籍是否在书架中
      isInShelf: (id) => {
        return (state) => state.shelf.some((book) => book.id === id);
      },
      addShelf: (book) => 
        set((state) => {
          // 检查是否已存在
          if (state.shelf.some((item) => item.id === book.id)) {
            return state;
          }
          return { shelf: [book, ...state.shelf] };
        }),
      deleteShelf: (id) => 
        set((state) => ({ 
          shelf: state.shelf.filter((book) => book.id !== id) 
        })),
    }),
    {
      name: "shelf-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useShelfStore;