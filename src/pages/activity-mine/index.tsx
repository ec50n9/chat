import { View, Text } from "@tarojs/components";
import "./index.scss";

function Index() {
  return (
    <View className='activity-mine'>
      <View className='header'>
        <Text className='header__back'>返回</Text>
        <Text className='header__title'>个人中心</Text>
        <Text className='header__invite'></Text>
      </View>
      <View className='content'>
        <View className='card card--top'>
          <View className='title title--coin'>我的金币</View>
          <View className='value value--coin'>0</View>
          <View className='title title--money'>我的低佣金</View>
          <View className='value value--money'>1.84</View>
          <View className='tips'>金币每日凌晨自动兑换成低佣金</View>
          <View className='bottom-bar'>
            <View>话费充值</View>
            <View>抽大奖</View>
            <View>换快币</View>
          </View>
        </View>

        <View className='card'>hello</View>
      </View>
    </View>
  );
}

export default Index;
