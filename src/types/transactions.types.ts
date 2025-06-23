import {HypermediaResponse} from "./base";
import {UserReference} from "./user.types";

export interface Transaction extends HypermediaResponse {
  id: number;
  Type: string;
  Created: string;
  Creator: string | UserReference;
  Description: string;
  Content?: string;
  ContentType?: string;
  TimeTaken?: number;
  CustomFields?: Record<string, any>;
}
