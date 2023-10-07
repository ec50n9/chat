import { View, Text, Textarea } from "@tarojs/components";
import Taro from "@tarojs/taro";
import classNames from "classnames";
import { useRef, useState } from "react";

export default function Index() {
  const { postId } = Taro.getCurrentInstance().router?.params as { postId: string };

  const reportType = useRef([
    {
      id: "1",
      name: "违法违规",
    },
    {
      id: "2",
      name: "色情低俗",
    },
    {
      id: "3",
      name: "诈骗信息",
    },
    {
      id: "4",
      name: "低质广告",
    },
    {
      id: "5",
      name: "虚假内容",
    },
    {
      id: "6",
      name: "涉及侵权",
    },
    {
      id: "7",
      name: "抄袭搬运",
    },
    {
      id: "8",
      name: "其他",
    },
  ]);

  const [selectedReportType, setSelectedReportType] = useState(
    new Set<string>()
  );
  const handleSelectReportType = (id: string) => {
    if (selectedReportType.has(id)) {
      selectedReportType.delete(id);
    } else {
      selectedReportType.add(id);
    }
    setSelectedReportType(new Set(selectedReportType));
  };

  const [reportReason, setReportReason] = useState("");

  const handleSubmit = () => {
    const reportTypeIds = [...selectedReportType];
    if (reportTypeIds.length === 0) {
      Taro.showToast({
        title: "请选择举报类型",
        icon: 'error'
      });
      return;
    }

    // 这里进行处理
    console.log(postId, reportTypeIds, reportReason);
  };

  return (
    <View className='py-5 px-4 min-h-screen bg-gray-1'>
      <View>
        请选择你想要举报的类型 <Text className='c-red-5'>*</Text>
      </View>

      <View className='mt-2 grid grid-cols-3 gap-2'>
        {reportType.current.map((item) => (
          <View
            key={item.id}
            className={classNames(
              "flex items-center justify-center py-1 text-sm b-2 b-solid b-gray-3 rounded",
              {
                "bg-gray-3": selectedReportType.has(item.id),
              }
            )}
            onClick={() => handleSelectReportType(item.id)}
          >
            <View>{item.name}</View>
          </View>
        ))}
      </View>

      <View className='mt-5'>请填写举报原因</View>
      <View className='mt-2'>
        <View className='bg-white p-3 rd of-hidden'>
          <Textarea
            className='w-full min-h-128'
            value={reportReason}
            onInput={(e) => setReportReason(e.detail.value)}
            placeholder='请填写举报原因'
            autoHeight
          />
        </View>
      </View>

      <View className='fixed bottom-0 left-0 right-0'>
        <View
          className='mx-4 mb-4 py-2 flex items-center justify-center bg-red-6 c-white text-sm rd'
          onClick={handleSubmit}
        >
          提交
        </View>
      </View>
    </View>
  );
}
