export type OriginMessage = {
  message_id: string; // 消息ID
  account_id: string; // 用户ID
  assistant_id: string; // 助手ID
  ask_question: string; // 问题
  question_answer: string; // 回答
  issue_time: string; // 时间
};

// 生成32位随机字符串
const generateMessageId = () => {
  const str = "abcdefghijklmnopqrstuvwxyz0123456789";
  let res = "";
  for (let i = 0; i < 32; i++) {
    const id = Math.ceil(Math.random() * 35);
    res += str[id];
  }
  return res;
};

const getRandomItems = (originList: any[], count:number) => {
  const list: any[] = [];
  const len = originList.length;
  const indexs: number[] = [];
  for (let i = 0; i < count; i++) {
    let index = Math.floor(Math.random() * len);
    while (indexs.includes(index)) {
      index = Math.floor(Math.random() * len);
    }
    indexs.push(index);
    list.push(originList[index]);
  }
  return list;
};

export default {
  list: async (assistant_id: string, previous_sequence_id: string|null = null) => {
    const originList = [
      {
        message_id: generateMessageId(), // 消息ID
        account_id: "4082b2562f32f2045855d94a518bd1cb", // 用户ID
        assistant_id, // 助手ID
        ask_question: "", // 问题
        question_answer:
          "作为一名AI语言模型，我可以通过自主学习来生成人类可以理解的语言，并与用户进行互动和交流。感谢您与我对话，希望我能够为您提供有用的信息和帮助。\n[来自ChatGPT智能回答]", // 回答
        issue_time: "2023-05-22 00:00:22", // 时间
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "说几句看看",
        question_answer: "",
        issue_time: "2023-05-22 00:00:17",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer:
          "作为AI助手，我可以执行以下操作：\n\n1. 回答你的问题或提供相关信息。\n2. 帮助你搜索特定的信息和答案。\n3. 可以编写或编辑一些文本，例如书信、电子邮件或报告。\n4. 可以提供时间和地点的信息。\n5. 可以为你设置闹钟或提醒事项。\n6. 可以打电话或发送短信给你想要联系的人。\n7. 可以提供天气预报和新闻以及其他实用信息。\n8. 可以帮助你翻译语言。\n9. 可以为你播放音乐或视频。\n10. 可以为你提供笑话或小游戏。\n[来自ChatGPT智能回答]",
        issue_time: "2023-05-21 13:09:24",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "你可以为我做什么？",
        question_answer: "",
        issue_time: "2023-05-21 13:09:16",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer:
          "我是一名AI虚拟助手，名叫xiaoah哦，我能够为您提供多种服务，例如智能聊天、语音识别、语音合成、图像识别、自然语言处理等功能，在您需要的时候随时为您服务，希望能够为您带来便利和愉悦的体验。\n[来自ChatGPT智能回答]",
        issue_time: "2023-05-21 13:07:04",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "简单介绍一下你自己吧",
        question_answer: "",
        issue_time: "2023-05-21 13:06:58",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer:
          "作为 AI，我是中立的。我不能表达任何偏见或情感。相对客观地评价美国，可以从以下方面考虑：\n\n1. 经济：美国是世界上最大的经济体之一，是全球最大的高科技、服务业和金融中心之一。美国的经济实力对于世界经济发展具有重要影响。\n\n2. 政治：美国是一个联邦制、总统制、宪法共和国。其政治体系稳定，政治制度成熟，选举制度透明，民主发展成熟，民间社会活跃。\n\n3. 文化：美国文化十分多元，能够容纳来自不同国家和民族的文化元素。美国是一个开放、自由、包容的国家，公民享有权利自由、机会平等。\n\n4. 教育：美国拥有全球最好的高等教育体系之一，拥有多所世界著名大学，吸引了世界各地学生前来学习。\n\n5. 科技：美国是世界上科技创新前沿国家之一，对于科技研发投入和创新氛围等方面拥有领先优势。\n\n当然，每个人对于美国的评价因具体情况而异。\n[来自ChatGPT智能回答]",
        issue_time: "2023-05-14 22:31:12",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "如何评价美国呢？",
        question_answer: "",
        issue_time: "2023-05-14 22:30:57",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer: "请注意文明用词，你这个问题，我无法回答~",
        issue_time: "2023-05-14 22:27:00",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "如何评价美国？",
        question_answer: "",
        issue_time: "2023-05-14 22:26:49",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer:
          "作为人工智能，我想说我很高兴能够和您交流，我会努力变得更加聪明和智能，以便更好地为您服务。同时，我也希望您能够保持好奇心和探究精神，让我们一起探索未知的领域，共同创造更美好的未来。\n[来自ChatGPT智能回答]",
        issue_time: "2023-05-11 22:57:15",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "说点啥吧",
        question_answer: "",
        issue_time: "2023-05-11 22:57:09",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer:
          'Sorry, I cannot respond to "b" as it is unclear what you are referring to or what you want me to do. Please provide more information or ask a specific question.\n[来自ChatGPT智能回答]',
        issue_time: "2023-05-11 00:32:41",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "b",
        question_answer: "",
        issue_time: "2023-05-11 00:32:39",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer:
          "I'm sorry, I'm not sure what you're asking for. Can you please provide more information or context?\n[来自ChatGPT智能回答]",
        issue_time: "2023-05-11 00:31:58",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "a",
        question_answer: "",
        issue_time: "2023-05-11 00:31:55",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer:
          "我是AI语言平台上的一个人工智能，您可以称呼我为AI助手。\n[来自ChatGPT智能回答]",
        issue_time: "2023-05-11 00:08:52",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "你是谁？",
        question_answer: "",
        issue_time: "2023-05-11 00:08:50",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "",
        question_answer: "我会说中文。\n[来自ChatGPT智能回答]",
        issue_time: "2023-05-11 00:06:50",
      },
      {
        message_id: generateMessageId(),
        account_id: "4082b2562f32f2045855d94a518bd1cb",
        assistant_id,
        ask_question: "你会说中文吗",
        question_answer: "",
        issue_time: "2023-05-11 00:06:49",
      },
    ];

    let list = getRandomItems(originList, 10);

    // 暂停一秒
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });

    return {
      code: 200,
      status: "SUCCESS",
      msg: "success",
      trace_id: "9a2e2534-ed02-47f3-8f6b-e91cc91dfa94",
      data: {
        list,
        latest_sequence_id: "1683734809373",
      },
    };
  },
};
