import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";

function Index() {
  const [coin, setCoin] = useState(0);
  const [money, setMoney] = useState(3.84);

  const redeemList = [
    {
      showBadge: true,
      value: 0.8,
    },
    {
      value: 2,
    },
    {
      value: 10,
    },
    {
      value: 20,
    },
    {
      value: 50,
    },
  ];
  const [currentRedeemIndex, setCurrentRedeemIndex] = useState(0);

  const redeemNow = () => {
    console.log("redeemNow:", redeemList[currentRedeemIndex].value);
  };

  return (
    <View className='activity-mine'>
      <View className='header'>
        <Text className='header__back' onClick={() => Taro.navigateBack()}>
          返回
        </Text>
        <Text className='header__title'>我的收益</Text>
      </View>

      <View className='content'>
        <View className='card card--top'>
          <View className='title title--coin'>我的金币</View>
          <View className='value value--coin'>{coin}</View>
          <View className='title title--money'>我的低佣金</View>
          <View className='value value--money'>{money}</View>
          <View className='tips'>金币每日凌晨自动兑换成低佣金</View>
          <View className='bottom-bar'>
            <View>话费充值</View>
            <View>抽大奖</View>
            <View>换快币</View>
          </View>
        </View>

        <View className='card card--redeem'>
          <View className='title'>兑换现金</View>
          <View className='list'>
            {redeemList.map((item, index) => (
              <View
                className={`item${
                  currentRedeemIndex === index ? " item--active" : ""
                }${item.showBadge ? " item--badge" : ""}${
                  item.value > money ? " item--disabled" : ""
                }`}
                key={index}
                onClick={() =>
                  item.value <= money && setCurrentRedeemIndex(index)
                }
              >
                <View className='item__content'>{item.value}元</View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className='footer'>
        <Button className='redeem-now' onClick={redeemNow}>
          立即兑换
        </Button>
      </View>
    </View>
  );
}

export default Index;
