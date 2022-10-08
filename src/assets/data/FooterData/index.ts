import data from './data.json';

export interface ISocial {
  name: string;
  icon: string;
}

export interface IPayment {
  name: string;
  srcImg: string;
}

export interface IFooterHomePage {
  title: string;
  listSocial: ISocial[];
  listPayment: IPayment[];
}

export { data };
