import { create } from "zustand";
import { persist } from "zustand/middleware"; // 导入持久化中间件

const useShelfStore = create(
  persist(
    (set) => ({
      shelf: [],
      isShelf: false,
      addShelf: (book) => set((state) => ({ shelf: [book, ...state.shelf], isShelf: true })),
      deleteShelf: (id) => set((state) => ({ shelf: state.shelf.filter((book) => book.id !== id), isShelf: false })),
    }),
    {
      name: "shelf-storage", // 存储的key
      getStorage: () => localStorage, // 使用localStorage
    }
  )
);

export default useShelfStore;
