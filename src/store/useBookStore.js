import { create } from "zustand";
import { getBook } from "@/api/book";

const books = [
  {
    id: "1-0",
    height: 260,
    title: "中国历史",
    rating: 8.5,
    description: "中国历史悠久，有丰富的历史文化。",
    url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-1",
    height: 290,
    title: "世界地理",
    rating: 8.2,
    description: "探索世界各地的自然地理和人文景观。",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-2",
    height: 400,
    title: "科技前沿",
    rating: 9.1,
    description: "了解最新的科技发展和创新成果。",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-3",
    height: 370,
    title: "艺术欣赏",
    rating: 8.7,
    description: "欣赏世界各地的艺术作品和流派。",
    url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-4",
    height: 260,
    title: "健康生活",
    rating: 8.9,
    description: "学习健康的生活方式和小贴士。",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-5",
    height: 430,
    title: "金融理财",
    rating: 8.4,
    description: "掌握基本的理财知识和投资技巧。",
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-6",
    height: 360,
    title: "美食文化",
    rating: 9.0,
    description: "探索世界各地的美食文化和烹饪技巧。",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-7",
    height: 270,
    title: "心理学入门",
    rating: 8.6,
    description: "了解心理学的基本概念和应用。",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-8",
    height: 330,
    title: "环境保护",
    rating: 9.2,
    description: "关注环境保护和可持续发展的重要性。",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "1-9",
    height: 410,
    title: "文学经典",
    rating: 8.8,
    description: "阅读和欣赏世界文学经典作品。",
    url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];
const useBookStore = create((set, get) => ({
  books: books, // 图书列表
  page: 2, // 当前页码
  isLoading: false, // 是否正在加载
  fetchMore: async () => {
    // 如果还在请求中，不在发起新的请求
    if (get().isLoading) return; // 如果正在加载，直接返回
    set({ isLoading: true }); // 设置正在加载状态为 true
    const res = await getBook(get().page); // 调用 getBook 函数获取图片列表数据
    if (res.code === 0) {
      // 如果请求成功
      // 之前的状态
      set((state) => ({
        // 更新状态
        books: [...state.books, ...res.data], // 将新获取的书本列表数据添加到 books 数组中
        page: state.page + 1, // 将页码加 1
        isLoading: false, // 设置正在加载状态为 false
      }));
    }
  },
}));

export default useBookStore;
