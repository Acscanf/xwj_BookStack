import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Tabbar } from "react-vant";
import { useNavigate, useLocation } from 'react-router-dom'
import "@/assets/icon/iconfont.css"; // 引入图标库

const tabs = [
  {
    icon: <i className="iconfont icon-icon_shuchengnor" />,
    title: "书城",
    path: "/discover",
  },
  {
    icon: <i className="iconfont icon-liaotian" />,
    title: "智能聊天",
    path: "/chat",
  },
  {
    icon: <i className="iconfont icon-iconyihuifu-" />,
    title: "书架",
    path: "/Shelf",
  },
  {
    icon: <i className="iconfont icon-wode" />,
    title: "我的",
    path: "/account",
  },
];

const MainLayout = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  // 监听路由变化,这样刷新也不会返回首页而是呆在原有的界面
  useEffect(() => {
    const path = location.pathname;
    const index = tabs.findIndex((tab) => tab.path.startsWith(path)); // startsWith 方法用于检查字符串是否以指定的子字符串开头
    setActive(index);
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
      {/* tabbar */}
      <Tabbar
        value={active}
        placeholder="true"
        onChange={(key) => {
          setActive(key);
          navigate(tabs[key].path);
        }}
      >
        {tabs.map((tab, index) => (
          <Tabbar.Item key={index} icon={tab.icon}>
            {tab.title}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
};

export default MainLayout;
