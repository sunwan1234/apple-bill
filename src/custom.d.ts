type RecordItem = {
  type: string;
  tag: string;
  amount: number;
  note: string;
  createdAt?: Date;
}

type Tag = {
  id: string;
  svg: string;
  name: string;
  type: string;
}