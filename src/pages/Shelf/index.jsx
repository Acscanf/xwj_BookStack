import useShelfStore from "@/store/useShelfStore";
import useTitle from "@/hooks/useTitle";
import { Sticky } from "react-vant";
import { useNavigate } from "react-router-dom";
import styles from "./shelf.module.css";

const Shelf = () => {
  const { shelf } = useShelfStore();
  const navigate = useNavigate();

  useTitle("芸香阁");

  // 事件委托：通过父元素捕获子元素点击
  const handleClickBook = (event) => {
    // 1. 找到被点击的书籍元素（通过 closest 或 dataset）
    const bookElement = event.target.closest(`.${styles.book}`);
    if (!bookElement) return; // 如果点击的不是书籍，直接返回

    // 2. 从 dataset 获取书籍 ID
    const bookId = bookElement.dataset.id;
    if (!bookId) return;

    // 3. 根据 ID 找到对应的书籍数据
    const book = shelf.find((item) => item.id === bookId);
    if (!book) return;

    // 4. 跳转到详情页
    navigate(`/detail/${book.id}`, {
      state: { book }, // 传递可序列化的书籍数据
    });
  };

  return (
    <div className={styles.shelf}>
      <Sticky>
        <h1 className={styles.h1}>芸&nbsp;&nbsp;香&nbsp;&nbsp;阁</h1>
      </Sticky>
      <div className={styles.bookList} onClick={handleClickBook}>
        {shelf.map((book) => (
          <div
            key={book.id}
            className={styles.book}
            data-id={book.id} // 存储书籍 ID
          >
            <img src={book.url} alt={book.title} />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shelf;
