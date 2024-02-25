export interface IReportDoc {
  _id: string;
  name: string;
  sportId: string;
  sellerId: string;
  branch: string;
  quantity: number;
  price: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReport {
  _id: string;
  totalSales: number;
  documents: IReportDoc[];
}
