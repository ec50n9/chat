import { View } from "@tarojs/components";
import UserInfo from "./components/UserInfo";
import WorkData from "./components/WorkData";
import CreativeService from "./components/CreativeService";
import Activity from "./components/Activity";

export default function Index() {
  return (
    <View className='h-screen bg-gray-1 c-gray-7 of-auto'>
      <UserInfo
        username='本人用户名'
        avatar='https://joeschmoe.io/api/v1/random'
      />
      <WorkData
        fansCount={2010}
        collectCount={1}
        likeCount={1}
        commentCount={1}
      />
      <CreativeService />
      <Activity days={1} />
    </View>
  );
}
