import styles from "./discover.module.css";
import useTitle from "@/hooks/useTitle";
import useBookStore from "@/store/useBookStore";
import Waterfall from "@/components/Waterfall";
import { useNavigate } from "react-router-dom";
import { Sticky, PullRefresh } from "react-vant";
import { Search } from "@react-vant/icons";

const Discover = () => {
  const navigate = useNavigate();
  const { books, fetchMore, isLoading, isRefreshing, refreshBooks } =
    useBookStore();

  // 设置界面的标题
  useTitle("书城首页");

  // 处理点击输入框跳转页面
  const handleClick = () => {
    navigate("/search");
  };

  // 处理刷新
  const onRefresh = async () => {
    await refreshBooks();
  };
  return (
    <div className={styles.discover}>
      <Sticky>
        <div className={styles.inputBox}>
          <Search className={styles.icon} />
          <input
            type="text"
            placeholder="请你输入你要搜索的内容"
            className={styles.input}
            onClick={handleClick}
            readOnly
          />
        </div>
      </Sticky>
      <PullRefresh
        onRefresh={onRefresh}
        disabled={isLoading}
        loading={isRefreshing}
        successText="刷新成功！" // 添加成功提示
        pullingText="下拉刷新"
        loosingText="释放刷新"
      >
        <div>
          <Waterfall books={books} fetchMore={fetchMore} loading={isLoading} />
        </div>
      </PullRefresh>
    </div>
  );
};

export default Discover;
