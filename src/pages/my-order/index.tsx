import { PullRefresh, List, Loading } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import Taro, { usePageScroll } from "@tarojs/taro";
import { useState, useRef } from "react";

function Item(props: {
  title: string;
  price: number;
  payed: boolean;
  orderNo: string;
  createdAt: Date;
}) {
  const priceStr = `${props.price.toFixed(2)}元`;
  const dateStr = `${props.createdAt.getFullYear()}-${props.createdAt.getMonth()}-${props.createdAt.getDate()}`;

  const handleCopy = () => {
    Taro.setClipboardData({
      data: props.orderNo,
    });
  };
  
  const handlePay = () => {};

  return (
    <View className='flex items-center gap-3 m-2 p-3 rd-3 b-1 b-solid b-gray-3 bg-white'>
      <View className='grow flex flex-col gap-0 of-hidden'>
        <View className='flex items-center gap-1.5'>
          <Text>{props.title}</Text>
          <Text className='text-sm c-gray-5'>{priceStr}</Text>
          {props.payed ? (
            <Text className='text-sm c-red-5'>已支付</Text>
          ) : (
            <Text className='text-sm c-green-5'>未支付</Text>
          )}
        </View>
        <View className='flex gap-2 text-sm'>
          <Text className='c-gray-5 truncate'>订单编号: {props.orderNo}</Text>
          <View className='shrink-0 c-gray-3' onClick={handleCopy}>
            复制
          </View>
        </View>
        <View className='c-gray-5 text-sm'>下单时间: {dateStr}</View>
      </View>
      {props.payed ? (
        <View className='shrink-0 px-3 py-1 text-sm rd-full bg-gray-3 c-white'>
          已确认
        </View>
      ) : (
        <View
          className='shrink-0 px-3 py-1 text-sm rd-full bg-green-5 c-white'
          onClick={handlePay}
        >
          确认支付
        </View>
      )}
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
          title: "高级代理人(年费)",
          price: 100,
          payed: i % 2 === 0,
          orderNo: "1234567891213421434123" + num,
          createdAt: new Date(),
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
              key={item.orderNo}
              title={item.title}
              price={item.price}
              payed={item.payed}
              orderNo={item.orderNo}
              createdAt={item.createdAt}
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
