export type User = {
  user_id: string;
  email: string;
  username: string;
  full_name: string;
  phone_number: string;
  profile_picture: string;
  comments: Comment[];
  posts: Item[];
};

export type Comment = {
  user_id: string;
  post_id: string;
  comment_content: string;
};

export type Post = {
  item: Item;
  user: User;
};

export type Item = {
  item_id: string;
  date_reported: string;
  description: string;
  location: string;
  reporter_id: string;
  status: string;
  image_url?: string;
  reporter: User;
  comments: object[];
  color: string;
  keywords: string[];
};

export type Chat = {
  chat_id: string;
  chat_members: string[];
  last_message: string;
  last_updated: string;
};

export type ChatMembership = {
  user_id: string;
  chat_id: string;
};

export type Message = {
  chat_id: string;
  message_id: string;
  sender_id: string;
  content: string;
  timestamp: string;
};

export const defaultUser: User = {
  user_id: "123",
  email: "default@example.com",
  username: "default",
  full_name: "John Doe",
  phone_number: "000-000-0000",
  profile_picture:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  comments: [],
  posts: [],
};

export const defaultItem: Item = {
  item_id: "0",
  date_reported: "2025-04-13T15:13:43",
  description: "jajaja",
  location: "ecse",
  reporter_id: "2",
  status: "lost",
  keywords: [""],
  color: "",
  image_url: "https://danb.me/blog/images/2022/ruby/ruby_07.webp",
  reporter: defaultUser,
  comments: [],
};

export const defaultPost: Post = {
  item: defaultItem,
  user: defaultUser,
};
