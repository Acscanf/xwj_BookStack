import styles from "./waterfall.module.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "@/components/BookCard";

const Waterfall = (props) => {
  const loader = useRef(null);
  const [columns, setColumns] = useState([[], []]); // [left, right]
  const [heights, setHeights] = useState([0, 0]); // [leftHeight, rightHeight]
  const { books, fetchMore, loading } = props;
  const navigate = useNavigate();

  // 初始化数据和更新数据
  useEffect(() => {
    console.log("Books updated:", books);

    // 完全重置布局（不再区分新旧数据）
    const newColumns = [[], []];
    let newHeights = [0, 0];

    // 处理所有书籍（从头开始计算）
    books.forEach((book) => {
      const estimatedHeight = book.height || 300;
      if (newHeights[0] <= newHeights[1]) {
        newColumns[0].push(book);
        newHeights[0] += estimatedHeight;
      } else {
        newColumns[1].push(book);
        newHeights[1] += estimatedHeight;
      }
    });

    setColumns(newColumns);
    setHeights(newHeights);
  }, [books]); // 当 books 变化时完全重建布局

  // 监听加载更多
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        fetchMore();
      }
    });

    if (loader.current) observer.observe(loader.current);
    return () => {
      // 组件卸载时，直接使用disconnect 释放资源，防止内存泄漏
      observer.disconnect();
    };
  }, [loading]);

  // 点击图片进行跳转
  // 事件委托：在父盒子（div.columns）上统一处理点击事件
  const handleClickNavigate = (e) => {
    // 确保点击的是 BookCard 或其子元素
    const card = e.target.closest(".book-card-wrapper"); // 使用 class 而非 data-id
    if (!card) return;

    const id = card.dataset.id;
    const book = books.find((book) => book.id === id);
    navigate(`/detail/${id}`, { state: { book } });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.columns} onClick={handleClickNavigate}>
        <div className={styles.column}>
          {columns[0].map((book) => (
            <div
              key={book.id}
              data-id={book.id}
              className="book-card-wrapper" // 添加可点击的 wrapper
            >
              <BookCard {...book} />
            </div>
          ))}
        </div>
        <div className={styles.column}>
          {columns[1].map((book) => (
            <div
              key={book.id}
              data-id={book.id}
              className="book-card-wrapper" // 添加可点击的 wrapper
            >
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>
      <div ref={loader} className={styles.loader}>
        <div className={styles.textContainer}>
          <span className={styles.char}>加</span>
          <span className={styles.char}>载</span>
          <span className={styles.char}>中</span>
          <div className={styles.dots}>
            <div className={`${styles.dot} ${styles.dot1}`}></div>
            <div className={`${styles.dot} ${styles.dot2}`}></div>
            <div className={`${styles.dot} ${styles.dot3}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waterfall;
