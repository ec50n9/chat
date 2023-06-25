import { Checkbox } from "@taroify/core";
import { View } from "@tarojs/components";
import { useState } from "react";
import { BrowsingHistoryOutlined, SmileOutlined, Wechat } from "@taroify/icons";
import "@taroify/icons/index.scss";
import "./index.scss";

const Header = () => (
  <View className='header'>
    <View className='header__top-title'>AI 小能</View>
    <View className='header__title'>AI 私人顾问，满足你的所有小期待</View>
    <View className='header__sub-title'>创造未来，传递美好</View>
  </View>
);

const Logo = () => <View className='logo'></View>;

const Tips = () => (
  <View className='tips'>
    <View className='tips__progress'>
      <View className='tips__progress-start'>1</View>
      <View className='tips__progress-line'></View>
      <View className='tips__progress-end'>2</View>
    </View>
    <View className='tips__title'>登录后即可享受更多服务</View>
    <View className='tips__desc'>
      我们将对您当前使用的微信号绑定至泡泡玛特手机号账户中，后续登录更快捷
    </View>
  </View>
);

const Actions = () => (
  <View className='actions'>
    <View className='actions__item'>
      <Wechat size={24} />
      微信一键登录
    </View>
  </View>
);

type Protocol = {
  title: string;
  url: string;
};

const Footer = (props: {
  protocolList: Protocol[];
  isAggree: boolean;
  onChange: (isAggree: boolean) => void;
  gotoProtocol: (protocol: Protocol) => void;
}) => {
  return (
    <View className='footer'>
      <Checkbox
        className='footer__checkbox'
        size={20}
        checked={props.isAggree}
        onChange={() => props.onChange(!props.isAggree)}
      />
      <View className='footer__protocol'>
        已阅读并同意
        {props.protocolList.map((protocol, index) => (
          <>
            {index === 0 ? "" : "、"}
            <View
              className='footer__protocol-link'
              key={protocol.title}
              onClick={() => props.gotoProtocol(protocol)}
            >
              {protocol.title}
            </View>
          </>
        ))}
      </View>
    </View>
  );
};

export default function Index() {
  const [isAggree, setIsAggree] = useState(false);
  const [protocolList, setProtocolList] = useState<Protocol[]>([
    {
      title: "《泡泡玛特会员服务协议》",
      url: "",
    },
    {
      title: "《泡泡玛特隐私政策》",
      url: "",
    },
    {
      title: "《泡泡玛特儿童隐私政策》",
      url: "",
    },
  ]);

  return (
    <View className='mine-page'>
      <Header />
      <Tips />
      <Actions />
      <Footer
        protocolList={protocolList}
        isAggree={isAggree}
        onChange={setIsAggree}
        gotoProtocol={(protocol) => {
          console.log(protocol);
        }}
      />
    </View>
  );
}
