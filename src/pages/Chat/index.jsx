import { useState, useRef, useEffect, forwardRef } from "react";
import { Button, Input as VantInput, Loading, Toast, Sticky } from "react-vant";
import useTitle from "@/hooks/useTitle";
import { chat } from "@/llm";
import styles from "./chat.module.css";
import { SmileCommentO, UserO } from "@react-vant/icons";

// 包装Vant组件以便能够使用ref
const Input = forwardRef((props, ref) => (
  <VantInput {...props} innerRef={ref} />
));

const Chat = () => {
  // 设置页面标题
  useTitle("AI助手");

  // 输入框的状态
  const [text, setText] = useState("");
  // 是否正在发送消息的状态
  const [isSending, setIsSending] = useState(false);
  // 聊天消息列表的状态，包含初始示例消息
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "您好，我是您的AI助手，可以为您解答各种问题~",
      role: "assistant",
    },
    {
      id: 2,
      content: "请问《红楼梦》的作者是谁？",
      role: "user",
    },
    {
      id: 3,
      content:
        "《红楼梦》的作者是曹雪芹，清代著名小说家。前八十回为曹雪芹所著，后四十回一般认为是高鹗续写。",
      role: "assistant",
    },
  ]);

  // 聊天区域和输入框的ref
  const chatAreaRef = useRef(null);

  // 当消息列表变化时，自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 滚动到聊天区域底部的函数
  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  // 处理发送消息的函数
  const handleChat = async () => {
    // 检查输入是否为空
    if (text.trim() === "") {
      Toast.info({
        message: "请输入内容",
        className: styles.toast,
      });
      return;
    }

    // 设置发送状态
    setIsSending(true);
    // 创建用户消息对象
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    // 清空输入框并添加用户消息到列表
    setText("");
    setMessages((prev) => [...prev, userMessage]);

    try {
      // 调用API获取AI回复
      const newMessage = await chat([
        {
          role: "user",
          content: text,
        },
      ]);

      // 将AI回复添加到消息列表
      setMessages((prev) => [
        ...prev,
        {
          ...newMessage.data,
          id: Date.now() + 1,
        },
      ]);
    } catch (error) {
      // 错误处理
      Toast.fail({
        message: "发送失败，请重试",
        className: styles.toast,
      });
    } finally {
      // 无论成功失败，都取消发送状态
      setIsSending(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <Sticky>
        <h1 className={styles.h1}>AI助手</h1>
      </Sticky>
      {/* 聊天消息显示区域 */}
      <div className={styles.chatArea} ref={chatAreaRef}>
        {/* 遍历显示所有消息 */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.message} ${
              msg.role === "assistant"
                ? styles.assistantMessage
                : styles.userMessage
            }`}
          >
            {msg.role === "assistant" ? (
              <>
                <SmileCommentO className={styles.icon} />
                <div className={styles.text}>{msg.content}</div>
              </>
            ) : (
              <>
                <div className={styles.text}>{msg.content}</div>
                <UserO className={styles.icon} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* 用了吸底的效果让输入框固定在底部 */}
      <Sticky position="bottom" offsetBottom={50}>
        {/* 输入区域 */}
        <div className={styles.inputArea}>
          {/* 输入框组件 */}
          <Input
            value={text}
            onChange={setText}
            placeholder="请输入您的问题..."
            className={styles.input}
            onKeyPress={(e) => e.key === "Enter" && handleChat()}
          />
          {/* 发送按钮 */}
          <Button
            className={styles.sendButton}
            disabled={isSending}
            onClick={handleChat}
          >
            {isSending ? "发送中..." : "发送"}
          </Button>
        </div>
      </Sticky>

      {/* 加载指示器 */}
      {isSending && (
        <div className={styles.loading}>
          <Loading type="ball" color="#8b7355" />
          <span className={styles.loadingText}>思考中...</span>
        </div>
      )}
    </div>
  );
};

export default Chat;
