import jsonData from './data.json';

export interface IHomepage {
  link: string;
  title: string;
  isSubNav?: boolean;
}

export interface INavbar {
  title: string;
  homepageList: IHomepage[];
}

export const data: INavbar = jsonData;
