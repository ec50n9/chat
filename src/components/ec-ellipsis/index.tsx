import { useState, useMemo } from "react";
import { ITouchEvent, Text } from "@tarojs/components";
import classNames from "classnames";

export default function EcEllipsis(props: {
  content: string;
  visibleCount: number;
  unfoldable?: boolean;
}) {
  // 是否折叠
  const [folded, setFolded] = useState(true);

  const visibleContent = useMemo(
    () => (folded ? props.content.slice(0, props.visibleCount) : props.content),
    [folded, props.content, props.visibleCount]
  );

  const ellipsisVisible = useMemo(
    () => folded && visibleContent.length < props.content.length,
    [folded, visibleContent, props.content]
  );

  const unfoldVisible = useMemo(
    () => props.unfoldable && props.visibleCount < props.content.length,
    [props.unfoldable, props.visibleCount, props.content]
  );

  const handleToggleFold = (e: ITouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFolded(!folded);
  };

  return (
    <>
      {visibleContent.split("\n").map((line, i, arr) => (
        <Text
          key={i}
          className={classNames({
            block: i !== arr.length - 1,
          })}
        >
          {line}
        </Text>
      ))}
      <Text className='inline-block ml-.5'>{ellipsisVisible ? "..." : ""}</Text>
      {unfoldVisible ? (
        <Text
          className='inline-block ml-1 text-sm c-blue-7'
          onClick={handleToggleFold}
        >
          {folded ? "展开" : "收起"}
        </Text>
      ) : (
        ""
      )}
    </>
  );
}
