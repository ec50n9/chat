import { Avatar, List, Loading, PullRefresh } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { usePageScroll } from "@tarojs/taro";
import { useState, useRef } from "react";

function Item(props: {
  avatar: string;
  title: string;
  subTitle: string;
  count: number;
  date: Date;
}) {
  const dateStr = `${props.date.getFullYear()}-${props.date.getMonth()}-${props.date.getDate()}`;

  return (
    <View className='px-3 py-2 pb-0 flex justify-between gap-3 bg-white'>
      <Avatar
        className='shrink-0'
        src={props.avatar}
        size='medium'
        shape='rounded'
      />
      <View className='grow flex flex-col b-b-2 b-b-solid b-b-gray-3 of-hidden'>
        <View className='flex justify-between items-center'>
          <Text>{props.title}</Text>
          <Text className='text-xs c-gray-5'>{dateStr}</Text>
        </View>
        <View className='flex justify-between items-center gap-3 pt-0 pb-2 of-hidden'>
          <Text className='text-xs c-gray-5 truncate'>
            {props.subTitle.replace("\n", "")}
          </Text>
          <View className='shrink-0 min-w-36 h-36 bg-red-5 c-white text-xs rd-full center'>
            {props.count}
          </View>
        </View>
      </View>
    </View>
  );
}

export default function Index() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const refreshingRef = useRef(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [reachTop, setReachTop] = useState(true);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop);
    setReachTop(aScrollTop === 0);
  });

  const onLoad = () => {
    setLoading(true);
    const newList = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const num = newList.length + 1;
        newList.push({
          id: `${num}`,
          avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
          title: "Ai 小能",
          subTitle: `吃了头炮（烟花爆竹）之后，有一些需要注意的事项如下：

          1. 确保安全：烟花爆竹具有一定的危险性，所以在使用或观赏烟花爆竹时，要注意安全，远离易燃物品和易燃场所，确保周围没有人或动物。
          
          2. 防止火灾：烟花爆竹会产生明火和火星，容易引起火灾。使用时要将烟花爆竹放在平坦、无风、没有易燃物的地方，并保持足够的消防器材和应急设备。
          
          3. 保护听力：烟花爆竹产生的声音很大，对耳朵造成损伤。在使用或观赏烟花爆竹时，要远离烟花爆竹的爆炸区域，或者佩戴耳塞、耳罩等保护听力的装备。
          
          4. 关注空气质量：烟花爆竹燃烧产生的烟雾和灰尘会对空气质量造成污染，容易引发呼吸道疾病。在使用或观赏烟花爆竹时，要远离烟雾和灰尘，保持室内空气流通。
          
          5. 尊重法律规定：根据当地法律，烟花爆竹可能有时间限制和使用限制。要遵守相关法律规定，确保在允许的时间和地点使用，避免违法行为。
          
          总之，头炮是一种危险品，使用或观赏时需谨慎并确保安全。最好遵循当地的法律法规，以及相关安全操作指南。`,
          count: (Math.random()*10).toFixed(0),
          date: new Date(),
        });
      }
      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 1000);
  };

  function onRefresh() {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  }

  return (
    <View className='min-h-screen bg-gray-1'>
      <PullRefresh
        loading={refreshingRef.current}
        reachTop={reachTop}
        onRefresh={onRefresh}
      >
        <List
          loading={loading}
          hasMore={hasMore}
          scrollTop={scrollTop}
          onLoad={onLoad}
        >
          {list.map((item) => (
            <Item
              key={item.id}
              avatar={item.avatar}
              title={item.title}
              subTitle={item.subTitle}
              count={item.count}
              date={item.date}
            />
          ))}
          {!refreshingRef.current && (
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && "没有更多了"}
            </List.Placeholder>
          )}
        </List>
      </PullRefresh>
    </View>
  );
}
