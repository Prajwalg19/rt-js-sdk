import {HypermediaResponse} from "./base";

export interface AuthConfig {
  baseUrl: string; // https://support.xxxx.xx
  token?: string; // auth token from rt dashboard
  username?: string; // username and password based authentication
  password?: string;
  cookie?: string;
}

export interface User extends HypermediaResponse {
  id: number;
  Name: string;
  EmailAddress?: string;
  RealName?: string;
  Organization?: string;
  Disabled?: boolean;
  CustomFields?: Record<string, any>;
}

export interface UserReference {
  id: string;
  type: 'user';
  _url: string;
}


