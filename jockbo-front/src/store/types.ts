export interface JockBoItemSummaryInfo {
  _id: string;
  myName: string;
  myNamechi: string;
}

export interface JockBoItemInfo extends JockBoItemSummaryInfo {
  mySae: string;
  father: JockBoItemSummaryInfo;
  grandPa: JockBoItemSummaryInfo;
}

export interface JockBoTreeItemInfo extends JockBoItemSummaryInfo {
  mySae: string;
  ancUID: string | null;
  children?: JockBoTreeItemInfo[];
}

export type searchDataInfo = {
  myName?: string;
  mySae?: string;
  fatherName?: string;
  grandPaName?: string;
};
