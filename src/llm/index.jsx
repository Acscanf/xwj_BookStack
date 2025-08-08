/**
 * chat 聊天
 *
 */
const DEEPSEEK_CHAT_API_URL = "https://api.deepseek.com/chat/completions";
const KIMI_CHAT_API_URL = "https://api.moonshot.cn/v1/chat/completions";
const Image_CHAT_API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations"

export const chat = async (
  messages,
  api_url = DEEPSEEK_CHAT_API_URL,
  api_key = import.meta.env.VITE_DEEPSEEK_API_KEY,
  model = "deepseek-chat",
  onStream = null // 新增流式回调函数
) => {
  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        model: model,
        messages,
        stream: onStream ? true : false, // 根据是否有回调决定是否流式
      }),
    });

    if (onStream) {
      // 流式处理
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.replace('data: ', '');
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              fullText += content;
              onStream(fullText); // 调用回调函数
            } catch (err) {
              console.error('解析流数据错误:', err);
            }
          }
        }
      }

      return {
        code: 0,
        data: {
          role: "assistant",
          content: fullText,
        },
      };
    } else {
      // 非流式处理
      const data = await response.json();
      return {
        code: 0,
        data: {
          role: "assistant",
          content: data.choices[0].message.content,
        },
      };
    }
  } catch (err) {
    return {
      code: 0,
      msg: "出错了...",
    };
  }
};

export const kimiChat = async (messages) => {
  const res = await chat(
    messages,
    KIMI_CHAT_API_URL,
    import.meta.env.VITE_KIMI_API_KEY,
    "moonshot-v1-auto"
  );
  return res;
};

export const getImageChat = async (prompt) => {
  try {
    const response = await fetch("/api/doubao/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ARK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "doubao-seedream-3-0-t2i-250415",
        prompt,
        response_format: "url",
        size: "1024x1024",
        guidance_scale: 2.5,
        watermark: false,
      }),
    });
    const data = await response.json();
    return data.data[0].url;
  } catch (err) {
    console.error("生成图片失败:", err);
    throw err;
  }
}

export const generateAvatar = async (text) => {
  const prompt = `
        你是一位漫画设计师，需要为用户设计头像，主打治愈的风格。
        用户的信息是：${text}
        要求有个性，有设计感。
    `;
  const res = await getImageChat(prompt);
  return res;
};
