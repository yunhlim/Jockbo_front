export interface JockBoItemInfo {
  _id: number;
  mySae: number;
  myName: string;
  children: JockBoItemInfo[];
}

export interface JockBoLineStyle {
  top: number;
  left: number;
  width: number;
}
