export type User = {
  user_id: string;
  email: string;
  username: string;
  full_name: string;
  phone_number: string;
  profile_picture: string;
  comments: Comment[];
  posts: Post[];
}

export type Comment = {
  user_id: string;
  post_id: string;
  comment_content: string;
}

export type Post = {
  item_id: string;
  date_reported: string;
  description: string;
  image_url: string;
  location: string;
  reporter_id: string;
  status: string;
}

export const defaultUser: User = {
  user_id: "123",
  email: "default@example.com",
  username: "default",
  full_name: "John Doe",
  phone_number: "000-000-0000",
  profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  comments: [],
  posts: []
}