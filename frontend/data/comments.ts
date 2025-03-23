export type CommentType = {
  id: string;
  parent_id: string;
  user: string;
  image: string;
  text: string;
};
export const COMMENTS: CommentType[] = [
  {
    id: "1",
    parent_id: "0",
    user: "mynameisJohn",
    image: "https://i.imgur.com/nkdqbqF.png",
    text: "I found this item at the ECSS around 7 PM coming into class ",
  },
  {
    id: "2",
    parent_id: "0",
    user: "ChrisIsmyname",
    image: "https://i.imgur.com/nkdqbqF.png",
    text: "NO way can you check your Dms rq??",
  },
];
