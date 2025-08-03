import {
  memo,
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle
} from "react";
import React from "react";
import { ArrowLeft, Close, Search } from "@react-vant/icons";
import { Sticky } from "react-vant";
import debounce from "@/utils/debounce";
import styles from "./searchbox.module.css";

const SearchBox = React.forwardRef((props, ref) => {
  // /api
  // 单项数据流
  // 子父通信
  const [query, setQuery] = useState("");
  const { handleQuery, addSearchHistory } = props;
  // 非受控组件
  const queryRef = useRef(null);
  // 将ref暴露给父组件
  useImperativeHandle(ref, () => queryRef.current);
  const handleChange = (e) => {
    let val = e.currentTarget.value;
    setQuery(val);
  };
  const clearQuery = () => {
    setQuery("");
    queryRef.current.value = "";
    queryRef.current.focus();
  };
  // 1. 防抖
  // 2. useMemo 缓存debounce结果 否则会反复执行
  const handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, []);
  // 查看是否显示删除图标
  const displayStyle = query ? { display: "block" } : { display: "none" };
  useEffect(() => {
    handleQueryDebounce(query);
  }, [query]);
  // 点击搜索
  const handleClickAddSearchHistory = () => {
    if (query) {
      addSearchHistory(query);
      clearQuery();
    }
  };
  return (
    <div className={styles.wrapper}>
      <Sticky className={styles.sticky}>
        <ArrowLeft
          onClick={() => history.go(-1)}
          className={styles.arrowleft}
        />
        <Search className={styles.icon} />
        <input
          type="text"
          className={styles.input}
          placeholder="请输入你要搜索的书名..."
          ref={queryRef}
          onChange={handleChange}
        />
        {/* 移动端用户体验 */}
        <Close
          onClick={clearQuery}
          style={displayStyle}
          className={styles.close}
        />
        <span className={styles.search} onClick={handleClickAddSearchHistory}>
          搜索
        </span>
      </Sticky>
    </div>
  );
});

export default memo(SearchBox);
