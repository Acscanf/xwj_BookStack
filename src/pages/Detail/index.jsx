import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Skeleton, Toast } from "react-vant";
import { useEffect } from "react";
import useDetailStore from "@/store/useDetailStore";
import useShelfStore from "@/store/useShelfStore";
import useTitle from "@/hooks/useTitle";
import styles from "./detail.module.css";
import { ArrowLeft, Plus, Cross } from "@react-vant/icons";

const Detail = () => {
  const { id } = useParams();
  const { loading, detail, setDetail } = useDetailStore();
  const { isShelf, addShelf, deleteShelf } = useShelfStore();
  const { author, readers, wordCount, description } = detail;
  const navigate = useNavigate();
  const { state } = useLocation();
  // 直接使用传递过来的数据
  const book = state?.book;
  // 如果 state 中没有数据，可以在这里做降级处理
  if (!book) {
    Toast.fail("数据加载失败");
    navigate("/");
    return;
  }
  const { title, rating, url } = book;
  // 调用 setDetail 方法获取详情数据
  useEffect(() => {
    setDetail();
  }, []);
  // 监听详情数据变化，更新页面标题
  useEffect(() => {
    useTitle(title);
  }, [title]);

  // 点击返回按钮
  const handleClickBack = () => {
    navigate(-1);
  };

  // 点击加入书架
  const handleClickAdd = () => {
    addShelf({ id, title, url, rating });
    Toast.success("加入成功");
  };

  // 点击删除
  const handleClickDelete = () => {
    deleteShelf(id);
    Toast.success("移出成功");
  };

  if (loading) return <Skeleton />;
  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <ArrowLeft onClick={handleClickBack} />
        {isShelf ? (
          <span onClick={handleClickDelete}>
            <Cross  />
            移出书架
          </span>
        ) : (
          <span onClick={handleClickAdd}>
            <Plus />
            加入书架
          </span>
        )}
      </div>
      <div className={styles.content}>
        <img src={url} alt={title} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.author}>{author}</div>
      <div className={styles.info}>
        <div>
          <span>{rating}</span>
          <span>评分</span>
        </div>
        <div>
          <span>{readers}</span>
          <span>正在阅读</span>
        </div>
        <div>
          <span>{wordCount}</span>
          <span>更新字数</span>
        </div>
      </div>
      <div className={styles.description}>
        <span>简介</span>
        <span>&nbsp;&nbsp;{description}</span>
      </div>
    </div>
  );
};

export default Detail;
