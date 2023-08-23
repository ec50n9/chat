// eslint-disable-next-line import/no-named-as-default
import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";
import { defineConfig, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [
    presetWeapp({
      // h5兼容
      isH5: process.env.TARO_ENV === "h5",
      platform: "taro",
      taroWebpack: "webpack5",
    }),
  ],
  rules: [
    // 多行文本超出部分省略号 line-n (已内置 line-clamp-n)
    [
      /^line-(\d+)$/,
      ([, l]) => {
        if (~~l === 1) {
          return {
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            width: "100%",
          };
        }
        return {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": l,
        };
      },
    ],
  ],
  shortcuts: [
    {
      "border-base": "border border-gray-500/10",
      center: "flex justify-center items-center",
    },
  ],
  transformers: [
    transformerClass(),
    transformerDirectives({
      enforce: "pre",
    }),
  ],
  content: {
    pipeline: {
      include: [/\.([jt]sx|css)($|\?)/],
      exclude: [],
    },
  },
});
