export interface UserData {
  caption: string;
  company: string;
  image: string;
  profileImage: string;
  timestamp: Timestamp;
  userId: string;
  username: string;
}

export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}
