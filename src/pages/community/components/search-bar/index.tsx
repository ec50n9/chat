import { useState } from "react";
import { Search } from "@taroify/core";
import './index.scss'

function Index(props: {}) {
  const [value, setValue] = useState("");
  return (
    <Search
      className='search-bar'
      value={value}
      onChange={(e) => setValue(e.detail.value)}
      placeholder='请输入搜索关键词'
      shape='rounded'
    />
  );
}

export default Index;