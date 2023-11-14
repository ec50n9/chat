import { Divider, Progress } from "@taroify/core";
import { GiftOutlined } from "@taroify/icons";
import { Text, View } from "@tarojs/components";

const cond =
  (/** 当前值 */ current: number) =>
  (
    /** 模板字符串 */
    fragment: TemplateStringsArray,
    /** 目标值 */
    target: number
  ): {
    /** 渲染文本 */ descElement: JSX.Element;
    /** 模板值 */ target: number;
    /** 当前值 */ current: number;
  } => ({
    descElement: (
      <View key={Date.now()}>
        {fragment[0]}
        <Text className='inline-block mx-1 c-red-5'>{target}</Text>
        {fragment[1]}
      </View>
    ),
    target,
    current,
  });

const Condition = (props: {
  conds: { descElement: JSX.Element; target: number; current: number }[];
}) => (
  <View className='px-5 py-3 bg-white rd-2 b-solid b-gray-3 b-2'>
    {props.conds.map((item, i) => (
      <View key={i}>
        <View className='flex justify-between items-center'>
          {item.descElement}
          <View className='c-gray-4'>
            当前: <Text className='c-blue-5'>{item.current}</Text>
          </View>
        </View>

        <Progress
          className='mt-4'
          percent={Math.round((item.current / item.target) * 100)}
        />

        {i < props.conds.length - 1 ? <Divider>且</Divider> : ""}
      </View>
    ))}
  </View>
);

export default function Index() {
  return (
    <View className='min-h-screen pb-5 bg-gray-50 c-gray-7 px-3'>
      {/* 标题 */}
      <View className='py-3 text-center text-lg'>苦瓜 优质创作者激励介绍</View>

      {/* 卡片 */}
      <View className='p-5 c-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg rd-3'>
        <View className='flex items-center gap-5'>
          <GiftOutlined className='-rotate-30' size={48} />
          <View className='text-sm'>
            为鼓励优质创作，营造良好氛围，苦瓜全新推出礼物激励 和创作激励计划。
            <br />
            <br />
            开通后，支持者可以给创作者增送各类虚拟礼物支持自己
            所喜爱的优质创作者。创作者可以从中获得由平台补贴和
            用户支持的现⾦收益。
          </View>
        </View>
      </View>

      {/* 开通标题 */}
      <View className='pt-5 text-center text-base c-gray-4'>如何开通？</View>
      <View className='pb-3 text-center text-lg c-gray-7'>
        满足以下任一条件
      </View>

      {/* 条件卡片 */}
      <View className='flex flex-col gap-3'>
        {/* 粉丝数量 */}
        <Condition conds={[cond(5000)`粉丝数量超过${10000}人`]} />

        {/* 瓜子+粉丝 */}
        <Condition
          conds={[
            cond(400)`近三个月获得瓜子${3000}`,
            cond(59)`粉丝数量超过${200}人`,
          ]}
        />
      </View>
    </View>
  );
}
