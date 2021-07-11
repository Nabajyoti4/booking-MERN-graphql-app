export interface Event {
  _id: string;
  title: string;
  description: string;
  price: number;
  creator: {
    _id: string;
  };
}
