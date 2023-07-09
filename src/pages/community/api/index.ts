export type Author = {
  name: string;
  avatar: string;
  circles: string[];
};

export type Post = {
  id: string;
  title: string;
  content: string;
  images: string[];
  commentCount: number;
  likeCount: number;
  createdAt: number;
  author: Author;
};

export type PostComment = {
  id: string;
  content: string;
  author: Author;
  createdAt: number;
};

export type Circle = {
  id: string;
  name: string;
};

export type Article = {
  id: string;
  title: string;
  cover: string;
  likeCount: number;
  author: Author;
}

const circles: Circle[] = [
  {
    id: "1",
    name: "圈子1",
  },
  {
    id: "2",
    name: "IT 互联网",
  },
  {
    id: "3",
    name: "圈子3",
  },
  {
    id: "4",
    name: "圈子4",
  },
  {
    id: "5",
    name: "圈子5",
  },
];

const posts: Post[] = [
  {
    id: "1",
    title: "标题",
    content: `Lorem ipsum是指一篇用于网页设计、排印、布局和印刷的伪拉丁文章，其用于代替英语去强调设计元素而不是内容。它也被称为占位符文（或填充文）。它是一个很便利的模板工具。它用于帮助编排文章或演示文稿的视觉元素，如排印，字体，或布局。Lorem ipsum 大多是由古典作家和哲学家西塞罗创作的拉丁文的一部分。它的单词和字母由于添加或去移除而被改变了，所以故意使其内容荒谬；它不是真实的，正确的，再也不是可理解的拉丁语。虽然lorem ipsum看起来仍像古典拉丁语，但实际上它没有任何意义。因为西塞罗的文本不包含K，W，Z 这几个有异于拉丁文的字母，所以这几个字母和其他一些字母常常被随机插入去模拟欧洲语言的排印样式，这些字在原文中其实并没有。`,
    images: [
      "https://avatars.githubusercontent.com/u/20592923?v=4",
      "https://avatars.githubusercontent.com/u/20592923?v=4",
      "https://avatars.githubusercontent.com/u/20592923?v=4",
    ],
    commentCount: 1,
    likeCount: 2,
    createdAt: 1620000000000,
    author: {
      name: "作者",
      avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
      circles: ["圈子1", "圈子2"],
    },
  },
  {
    id: "2",
    title: "标题",
    content: "内容",
    images: [],
    commentCount: 1,
    likeCount: 2,
    createdAt: 1620000000000,
    author: {
      name: "作者",
      avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
      circles: ["圈子1", "圈子2"],
    },
  },
  {
    id: "3",
    title: "标题",
    content: `Lorem ipsum是指一篇用于网页设计、排印、布局和印刷的伪拉丁文章，其用于代替英语去强调设计元素而不是内容。它也被称为占位符文（或填充文）。它是一个很便利的模板工具。它用于帮助编排文章或演示文稿的视觉元素，如排印，字体，或布局。Lorem ipsum 大多是由古典作家和哲学家西塞罗创作的拉丁文的一部分。它的单词和字母由于添加或去移除而被改变了，所以故意使其内容荒谬；它不是真实的，正确的，再也不是可理解的拉丁语。虽然lorem ipsum看起来仍像古典拉丁语，但实际上它没有任何意义。因为西塞罗的文本不包含K，W，Z 这几个有异于拉丁文的字母，所以这几个字母和其他一些字母常常被随机插入去模拟欧洲语言的排印样式，这些字在原文中其实并没有。`,
    images: [],
    commentCount: 1,
    likeCount: 2,
    createdAt: 1620000000000,
    author: {
      name: "作者",
      avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
      circles: [],
    },
  },
];
const PostComments = {
  "1": [
    {
      id: "1",
      content: "评论内容",
      author: {
        name: "作者",
        avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
        circles: [],
      },
      createdAt: 1620000000000,
    },
    {
      id: "2",
      content: "评论内容",
      author: {
        name: "作哈哈哈者",
        avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
        circles: [],
      },
      createdAt: 1620000000000,
    },
    {
      id: "3",
      content: "评论内容",
      author: {
        name: "梁从心",
        avatar: "https://avatars.githubusercontent.com/u/20592923?v=4",
        circles: [],
      },
      createdAt: 1620000000000,
    },
  ],
};

export const getPosts = async () => posts;
export const getPostsById = async (id: string) =>
  posts.find((post) => post.id === id);
export const getPostsByAuthor = async (author: string) =>
  posts.filter((post) => post.author.name === author);
export const getPostsByCircle = async (circle: string) =>
  posts.filter((post) => post.author.circles.includes(circle));
export const getPostsByTitle = async (title: string) =>
  posts.filter((post) => post.title.includes(title));

export const getPostCommentsByPostId = async (postId: string) =>
  PostComments[postId] || [];

export const getCircles = async () => circles;
