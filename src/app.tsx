import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { useLaunch } from "@tarojs/taro";
import "uno.css";
import "@taroify/core/index.scss";
import "@taroify/icons/index.scss";
import configStore from "./store";
import "./app.scss";

const store = configStore();

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>;
}

export default App;
