import { ScrollView, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { Circle } from "../api";
import SearchBar from "../components/search-bar";
import "./index.scss";

function CircleItem(props: { circle: Circle }) {
  return (
    <View className='circle-item'>
      <View className='circle-item__cover'></View>
      <View className='circle-item__info'>
        <View className='circle-item__top'>
          <View className='circle-item__name'>{props.circle.name}</View>
          <View className='circle-item__follow'>关注</View>
        </View>
        <View className='circle-item__actions'>
          <View className='circle-item__actions__member'>123 加入</View>
          <View className='circle-item__actions__read'>123 阅读</View>
        </View>
      </View>
    </View>
  );
}

function CircleList(props: { circles: Circle[] }) {
  return (
    <View className='circle-list'>
      {props.circles.map((circle) => (
        <CircleItem circle={circle} key={circle.id} />
      ))}
    </View>
  );
}

function Index() {
  const [circles, setCircles] = useState<Circle[]>([]);
  useEffect(() => {
    setCircles([
      {
        id: "1",
        name: "圈子1",
      },
      {
        id: "2",
        name: "圈子2",
      },
    ]);
  }, []);

  return (
    <View className='square-tab'>
      <ScrollView className='scroll-view' scrollY>
        <SearchBar />
        <CircleList circles={circles} />
      </ScrollView>
    </View>
  );
}

export default Index;
