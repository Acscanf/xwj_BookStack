import SearchBox from "@/components/SearchBox";
import useSearchStore from "@/store/useSearchStore.js";
import styles from "./search.module.css";
import useTitle from "@/hooks/useTitle";
import { useState, memo, useRef } from "react";
import { Dialog } from "react-vant";
import { DeleteO, Cross } from "@react-vant/icons";

const SearchHistory = memo((props) => {
  const { searchHistory, deleteIcon, onDeleteItem } = props;

  // 点击删除搜索历史
  const handleHistoryClick = (e) => {
    // 检查点击的是否是 Cross 图标
    if (e.target.closest(`.${styles.cross}`)) {
      const itemElement = e.target.closest(`.${styles.item}`);
      if (itemElement) {
        // 通过 data-timestamp 获取当前项的时间戳
        const timestamp = Number(itemElement.dataset.timestamp);
        onDeleteItem(timestamp);
      }
    }
  };

  return (
    <div className={styles.history} onClick={handleHistoryClick}>
      {searchHistory.map((item) => (
        <div
          key={item.timestamp} // 用 timestamp 作为唯一 key
          className={styles.item}
          data-timestamp={item.timestamp} // 存储时间戳到 DOM
        >
          {item.text}
          {deleteIcon && <Cross className={styles.cross} />}
        </div>
      ))}
    </div>
  );
});

const Search = () => {
  const [query, setQuery] = useState("");
  const [deleteIcon, setDeleteIcon] = useState(false);
  // 搜索框ref
  const queryRef = useRef(null);
  const {
    suggestList,
    setSuggestList,
    searchHistory,
    addSearchHistory,
    removeSearchHistory,
    deleteSearchHistory,
  } = useSearchStore();

  // 判断是否显示搜索提示
  const suggestListStyle =
    query !== "" ? { display: "block" } : { display: "none" };
  useTitle("搜索界面");
  // 回调函数，用来子传父的搜索信息
  const handleQuery = (query) => {
    setQuery(query);
    if (!query) {
      return;
    }
    setSuggestList(query);
  };

  // 点击删除全部
  const handleClickRemove = () => {
    Dialog.confirm({
      title: "确认删除全部搜索历史吗？",
    })
      .then(() => {
        removeSearchHistory();
      })
      .catch(() => {});
  };

  // 点击添加搜索历史
  const handleClickAddSearchHistory = (e) => {
    // 检查点击的是否是 .item 子元素
    const itemElement = e.target.closest(`.${styles.item}`);
    if (itemElement) {
      const itemText = itemElement.textContent; // 获取点击的搜索建议文本
      addSearchHistory(itemText); // 添加到搜索历史
      setQuery(""); // 清空搜索框（可选）
      queryRef.current.value = "";
      queryRef.current.focus();
    }
  };
  return (
    <div className={styles.container}>
      <SearchBox handleQuery={handleQuery} addSearchHistory={addSearchHistory} ref={queryRef} />
      <div className={styles.historyTitle}>
        <h1>搜索历史</h1>
        {!deleteIcon ? (
          <DeleteO
            className={styles.deleteIcon}
            onClick={(e) => {
              setDeleteIcon(true);
            }}
          />
        ) : (
          <div className={styles.deleteSpan}>
            <span onClick={handleClickRemove}>全部删除</span>
            <span
              onClick={(e) => {
                setDeleteIcon(false);
              }}
            >
              | 完成
            </span>
          </div>
        )}
      </div>
      <SearchHistory searchHistory={searchHistory} deleteIcon={deleteIcon} onDeleteItem={deleteSearchHistory} />
      <div className={styles.list} style={suggestListStyle} onClick={handleClickAddSearchHistory}>
        {suggestList.map((item) => (
          <div key={item} className={styles.item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;