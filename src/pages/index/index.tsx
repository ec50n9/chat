import { View, Text, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { Popup } from "@taroify/core";
import "./index.scss";
import Lucky from "../lucky";
import { useState } from "react";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [luckyOpen, setLuckyOpen] = useState(false);

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Button onClick={() => setLuckyOpen(true)}>Open lucky</Button>
      <Popup open={luckyOpen} onClose={()=>setLuckyOpen(false)}>
        <Lucky />
      </Popup>
    </View>
  );
}
