import { Divider, Progress } from "@taroify/core";
import { View } from "@tarojs/components";

type ActivityProps = {
  days: number;
};
//   useEffect(() => {
//     drawProgress();
//   });

//   const drawProgress = () => {
//     const ctx = Taro.createCanvasContext("progressCanvas");
//     console.log(ctx);

//     const dpr = Taro.getSystemInfoSync().pixelRatio;
//     // @ts-ignore
//     const viewWidth = Math.round(ctx.canvas.offsetWidth*dpr);
//     // @ts-ignore
//     const viewHeight = Math.round(ctx.canvas.height* dpr);
//     // @ts-ignore
//     ctx.canvas.width = viewWidth;
//     // @ts-ignore
//     ctx.canvas.height = viewHeight;

//     const progressWidth = viewWidth;
//     const progressHeight = 50;
//     const progressRadius = progressHeight / 2;
//     const progressColor = "orange";

//     const nodeCount = 10;
//     const nodeRadius = 4;
//     const nodeColor = "#fff";

//     ctx.beginPath();
//     ctx.strokeStyle = progressColor;
//     ctx.lineWidth = progressHeight;
//     ctx.lineCap = "round";
//     ctx.moveTo(progressRadius, progressRadius);
//     ctx.lineTo(progressWidth - progressRadius, progressRadius);
//     ctx.stroke();
//     // ctx.fill();

//     ctx.beginPath();
//     ctx.strokeStyle = "red";
//     ctx.lineWidth = progressHeight;
//     ctx.lineCap = "round";
//     ctx.moveTo(progressRadius, progressRadius);
//     ctx.lineTo((progressWidth - progressRadius) / 3, progressRadius);
//     ctx.stroke();

//     // 绘制进度节点
//     const nodeGap = progressWidth / (nodeCount - 1); // 进度节点间距
//     for (let i = 0; i < nodeCount; i++) {
//       const nodeX = 20 + i * nodeGap;
//       ctx.beginPath()
//       ctx.setFontSize(20 * dpr)
//       ctx.fillText('hahaha', nodeX, 100);
//     }

//     ctx.draw();
//   };

//   return (
//     <Canvas
//       id='progressCanvas'
//       canvasId='progressCanvas'
//       className='w-full h-100'
//       type='2d'
//     />
//   );
// };

export default function (props: ActivityProps) {
  return (
    <View className='mt-3 mx-3 p-3 flex flex-col items-center bg-white rd-3'>
      <View>每日签到大礼包</View>
      <Divider className='my-1! w-1/2 b-gray-4!'>无限瓜子领不停</Divider>
      <View className='mt-3 text-lg'>已连续签到 {props.days} 天</View>
      <View className='mt-1 text-sm c-gray-4'>连续签到 7 天享受更高奖励</View>
      <Progress
        className='mt-1 w-full'
        percent={(props.days / 7) * 100}
        label={`还差 ${7 - props.days} 天`}
      />
      <View className='mt-3 px-4 py-1 text-sm c-white bg-red-5 rd-2'>签到</View>
    </View>
  );
}
