import styles from "./waterfall.module.css";
import { useEffect, useRef, useState } from "react";
import BookCard from "@/components/BookCard";

const Waterfall = (props) => {
  const loader = useRef(null);
  const [columns, setColumns] = useState([[], []]); // [left, right]
  const [heights, setHeights] = useState([0, 0]); // [leftHeight, rightHeight]
  const { books, fetchMore, loading } = props;

  // 初始化数据和更新数据
  useEffect(() => {
    // 只处理新添加的书籍
    const processedCount = columns[0].length + columns[1].length;
    const newBooks = books.slice(processedCount);

    const newColumns = [[...columns[0]], [...columns[1]]];
    let newHeights = [...heights];

    for (let book of newBooks) {
      // 估计图片高度，实际高度可能在图片加载后确定
      const estimatedHeight = book.height || 300; // 默认值

      if (newHeights[0] <= newHeights[1]) {
        newColumns[0].push(book);
        newHeights[0] += estimatedHeight;
      } else {
        newColumns[1].push(book);
        newHeights[1] += estimatedHeight;
      }
    }

    setColumns(newColumns);
    setHeights(newHeights);
  }, [books]); // 当books变化时触发

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.columns}>
        <div className={styles.column}>
          {columns[0].map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
        <div className={styles.column}>
          {columns[1].map((book) => (
            <BookCard key={book.id} {...book} />
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
