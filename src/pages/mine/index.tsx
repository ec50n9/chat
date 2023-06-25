import { View, Text, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import {
  Arrow,
  BalanceList,
  ChatOutlined,
  Diamond,
  Edit,
  Gem,
  ShoppingCart,
  VolumeOutlined,
} from "@taroify/icons";
import "@taroify/icons/index.scss";
import { useState } from "react";
import "./index.scss";

function Menu(props: any) {
  const { menu } = props;
  return (
    <View className='grid-item grid-item--md card card--md'>
      <View className='card__title'>{menu.title}</View>
      <View className={`card-list card-list--${menu.direction}`}>
        {menu.items.map((item: any) => {
          return (
            <View className='card-item' key={item.title}>
              <View className='card-item__icon'>
                {item.icon ? item.icon : <Gem />}
              </View>
              <View className='card-item__title'>{item.title}</View>
              {menu.direction === "ver" && (
                <View className='card-item__nav'>
                  <Arrow />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

function Profile({
  hasLogin = false,
  username = "Hello!",
  desc = "登录享受更多精彩服务",
  avatar = "",
  onLogin = () => {},
  onEdit = () => {},
}) {
  return (
    <View className='profile'>
      <View
        className='profile__avatar'
        style={{
          backgroundImage: avatar ? `url(${avatar})` : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></View>
      <View className='profile__info'>
        <View className='profile__name'>{username}</View>
        <View className='profile__desc'>{desc}</View>
      </View>
      {hasLogin ? (
        <View className='profile__edit' onClick={onEdit}>
          <Edit />
        </View>
      ) : (
        <View className='profile__login' onClick={onLogin}>
          注册/登录
        </View>
      )}
    </View>
  );
}

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [menus, setMenus] = useState([
    {
      title: "我的会员",
      direction: "hor",
      items: [
        {
          icon: <Diamond />,
          title: "会员中心",
        },
        {
          icon: <ShoppingCart />,
          title: "会员商城",
        },
        {
          icon: <BalanceList />,
          title: "我的订单",
        },
      ],
    },
    {
      title: "我的动态",
      direction: "ver",
      items: [
        {
          icon: <Diamond color='#1989fa' />,
          title: "消息中心",
        },
        {
          icon: <ShoppingCart />,
          title: "发布动态",
        },
        {
          icon: <BalanceList />,
          title: "我的收藏",
        },
        {
          icon: <BalanceList />,
          title: "正在关注",
        },
        {
          icon: <BalanceList />,
          title: "我的粉丝",
        },
      ],
    },
    {
      title: "更多功能",
      direction: "ver",
      items: [
        {
          icon: <Diamond />,
          title: "常见问题",
        },
        {
          icon: <ShoppingCart />,
          title: "联系客服",
        },
      ],
    },
  ]);

  return (
    <View className='page-mine'>
      {/* 顶部个人信息 */}
      <Profile hasLogin username='梁从心' desc='生活简单，爱吃煎蛋' />

      <View className='grid-layout'>
        {/* 我的好礼券 */}
        <View className='grid-item card card--sm'>
          <View className='card__title'>我的积分</View>
          <View className='card__count'>{140}</View>
          <View className='card__details'>
            <ChatOutlined />
            获取积分
          </View>
        </View>

        {/* 我的好礼券 */}
        <View className='grid-item card card--sm'>
          <View className='card__title'>我的金币</View>
          <View className='card__count'>{0}</View>
          <View className='card__details'>
            <ChatOutlined />
            获取金币
          </View>
        </View>

        {/* 我的好礼券 */}
        <View className='grid-item card card--sm'>
          <View className='card__title'>抽奖机会</View>
          <View className='card__count'>{3}</View>
          <View className='card__details'>
            <ChatOutlined />
            马上抽奖
          </View>
        </View>

        {menus.map((menu: any) => {
          return <Menu menu={menu} key={menu.title} />;
        })}
      </View>
    </View>
  );
}
