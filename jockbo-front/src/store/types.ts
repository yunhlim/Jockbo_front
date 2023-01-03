export interface JockBoItemInfo {
  _id: string;
  mySae: string;
  myName: string;
  myNamechi: string;
  ancUID: string | null;
  children?: JockBoItemInfo[];
}

export type searchDataInfo = {
  myName?: string;
  mySae?: string;
  fatherName?: string;
  grandPaName?: string;
};
