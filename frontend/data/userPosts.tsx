export interface PostTypeUser {
  id: number;
  username: string;
  userImage: string;
  imageUrl: string;
  caption: string;
  title: string;
  location: string;
  type: "found" | "lost";
  likes: number;
  comments: number;
  timestamp: string;
}

export const USERPOSTS: PostTypeUser[] = [
  {
    id: 1,
    username: "johndoe",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl: "https://i.imgur.com/CI4Z9vc.jpeg",
    caption:
      "Found this water bottle near the library. If it's yours, please contact me!",
    title: "Found Water Bottle",
    location: "University Library",
    type: "found",
    likes: 42,
    comments: 5,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    username: "johndoe",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl:
      "https://images.offerup.com/-dbCckCpK104oqkc_u1stCo7LRw=/1920x1920/54ee/54ee2aa6890e4ed3bf52ddf5e0b40a21.jpg",
    caption:
      "Lost my AirPods in the ECSN building. If found, please let me know!",
    title: "Lost AirPods",
    location: "ECSN Building",
    type: "lost",
    likes: 28,
    comments: 12,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    username: "johndoe",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl:
      "https://as1.ftcdn.net/v2/jpg/02/72/40/44/1000_F_272404412_MD9Qnk52bpTk9BEhpq2ZofYupyF8UWbg.jpg",
    caption:
      "Found a student ID card near the Student Union. Name is Sarah Johnson.",
    title: "Found Student ID",
    location: "Student Union",
    type: "found",
    likes: 56,
    comments: 8,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    username: "johndoe",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    imageUrl:
      "https://images.vivintcdn.com/global/vivint.com/resources/products/smart-lock/lost-keys-keyless-entry.jpg ",
    caption:
      "Lost my keys somewhere in the ECSS building. They have a blue keychain.",
    title: "Lost Keys",
    location: "ECSS Building",
    type: "lost",
    likes: 34,
    comments: 15,
    timestamp: "2 days ago",
  },
];
