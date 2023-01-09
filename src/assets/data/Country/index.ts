import jsonData from './data.json';

export interface ICountry {
  country: string
  alpha2Code: string
  alpha3Code: string
  numberCode: string
  states: string[]
}

export interface ICountries {
  title: string;
  list: ICountry[];
}

export const countriesData: ICountries = jsonData;

// import jsonData from './data.json';
//
// export interface ICountry {
//   id: number
//   title: string
//   alpha2: string
//   alpha3: string
// }
//
// export interface ICountries {
//   title: string;
//   list: ICountry[];
// }
//
// export const countriesData: ICountries = jsonData;
