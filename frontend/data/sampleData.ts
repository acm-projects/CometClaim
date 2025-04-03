export interface Item {
  id: string;
  name: string;
  description: string;
  location: string;
  keywords: string[];
  color: string;
  image?: string;
  date: string;
}

export const sampleItems: Item[] = [
  {
    id: "1",
    name: "Black AirPods Case",
    description: "Found black AirPods case near the entrance",
    location: "ecsn",
    keywords: ["airpods", "case", "electronics"],
    color: "black",
    image: "https://img.icons8.com/ios-filled/50/headphones.png",
    date: "2023-04-15",
  },
  {
    id: "2",
    name: "Blue Water Bottle",
    description: "Found blue water bottle in classroom 2.410",
    location: "ecss",
    keywords: ["water_bottle", "drink"],
    color: "blue",
    image: "https://img.icons8.com/ios-filled/50/water-bottle.png",
    date: "2023-04-16",
  },
  {
    id: "3",
    name: "Silver MacBook Pro",
    description: "Found MacBook Pro in the library",
    location: "library",
    keywords: ["laptop", "electronics", "apple"],
    color: "silver",
    image: "https://img.icons8.com/ios-filled/50/macbook.png",
    date: "2023-04-17",
  },
  {
    id: "4",
    name: "Orange Umbrella",
    description: "Found orange umbrella at the bus stop",
    location: "su",
    keywords: ["umbrella", "rain"],
    color: "orange",
    image: "https://img.icons8.com/ios-filled/50/umbrella.png",
    date: "2023-04-18",
  },
  {
    id: "5",
    name: "Red iPhone 13",
    description: "Found iPhone 13 in the cafeteria",
    location: "su",
    keywords: ["phone", "electronics", "apple"],
    color: "red",
    image: "https://img.icons8.com/ios-filled/50/iphone.png",
    date: "2023-04-19",
  },
  {
    id: "6",
    name: "Silver Keys",
    description: "Found keys in ECSW building",
    location: "ecsw",
    keywords: ["keys"],
    color: "silver",
    image: "https://img.icons8.com/ios-filled/50/key.png",
    date: "2023-04-20",
  },
  {
    id: "7",
    name: "Brown Wallet",
    description: "Found wallet in the Science building",
    location: "science",
    keywords: ["wallet", "money"],
    color: "brown",
    image: "https://img.icons8.com/ios-filled/50/wallet.png",
    date: "2023-04-21",
  },
  {
    id: "8",
    name: "White AirPods",
    description: "Found AirPods in the ATC building",
    location: "atc",
    keywords: ["airpods", "electronics", "apple"],
    color: "white",
    image: "https://img.icons8.com/ios-filled/50/earbud-headphones.png",
    date: "2023-04-22",
  },
  {
    id: "9",
    name: "Black Laptop Charger",
    description: "Found laptop charger in BSB building",
    location: "bsb",
    keywords: ["charger", "electronics"],
    color: "black",
    image: "https://img.icons8.com/ios-filled/50/laptop-charger.png",
    date: "2023-04-23",
  },
  {
    id: "10",
    name: "Purple Purse",
    description: "Found purse in the SLC building",
    location: "slc",
    keywords: ["purse", "bag"],
    color: "purple",
    image: "https://img.icons8.com/ios-filled/50/purse.png",
    date: "2023-04-24",
  },
];
