import { Country } from "../shared/models/Country.model";
import { paramsToString } from "../utils/paramsToString.util";

const BASE_URL = "https://restcountries.com/v3.1/";

export interface getNameListParams {
  name: string;
  fullText?: boolean;
}

export interface getNameListResponse extends Array<Country> {}

export class Countries {
  public static async getNameList({
    name,
    fullText,
  }: getNameListParams): Promise<getNameListResponse> {
    const params = { ...(fullText && { fullText }) };
    const stringParams = paramsToString(params);

    const response = await fetch(`${BASE_URL}name/${name}?${stringParams}`);
    const data = await response.json();

    return data as getNameListResponse;
  }
}
