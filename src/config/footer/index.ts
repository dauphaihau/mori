import jsonData from './data.json';

interface IPayment {
  title: string
  srcImg: string
  width: number
  height: number
}

interface ILink {
  title: string
  list: {
    icon?: string
    title: string
  }[]
}

export interface IFooterConfig {
  title: string;
  linksList: ILink[];
  listPayment: IPayment[];
}

export const footerConfig: IFooterConfig = jsonData;
