import { create } from "zustand";
import { persist } from "zustand/middleware"; // 导入持久化中间件

const useAccountStore = create(
  persist(
    (set, get) => ({
      nickname: "宇宙的本质是孤独",
      level: "5级",
      slogan: "先成为自己的山，再去找心中的海",
      avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
      updateAvatar: (newAvatar) => {
        set({ avatar: newAvatar });
      },
    }),
    {
      name: "account-storage", // 存储的key
      getStorage: () => localStorage, // 使用localStorage
    }
  )
);

export default useAccountStore;
