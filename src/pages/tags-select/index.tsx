import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function Index() {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const current = pages[pages.length - 1];
    const eventChannel = current.getOpenerEventChannel();
    eventChannel.emit("updateSelectedTags", {
      selectedTags: ["表歉意", "哈哈哈"],
    });

    eventChannel.on("initSelectedTags", ({ selectedTags }) =>
      setTags(selectedTags)
    );
  }, []);

  return <View>选择标签</View>;
}
