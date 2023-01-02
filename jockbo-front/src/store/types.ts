export interface JockBoItemInfo {
  _id: string;
  mySae: string;
  myName: string;
  myNamechi: string;
  ancUID: string | null;
  children: JockBoItemInfo[];
}
