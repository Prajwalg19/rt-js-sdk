import { HypermediaResponse } from "./base";
import { UserReference } from "./user.types";

export interface AssetCatalogReference {
  id: string;
  type: 'catalog';
  _url: string;
  name: string;
}

export interface Asset extends HypermediaResponse {
  id: number;
  Name: string;
  Status?: string;
  Description?: string;
  Catalog?: string | AssetCatalogReference;
  Owner?: string | UserReference;
  HeldBy?: string | UserReference;
  Contacts?: (string | UserReference)[];
  Created?: string;
  LastUpdated?: string;
  Creator?: string | UserReference;
  LastUpdatedBy?: string | UserReference;
  CustomFields?: Record<string, any>;
  Type: 'asset';
}

export interface AssetCreateRequest {
  Name: string;
  Catalog?: string | number;
  Status?: string;
  Description?: string;
  Owner?: string;
  HeldBy?: string;
  Contacts?: string | string[];
  CustomFields?: Record<string, any>;
}

export interface AssetUpdateRequest {
  Name?: string;
  Status?: string;
  Description?: string;
  Catalog?: string | number;
  Owner?: string;
  HeldBy?: string;
  Contacts?: string | string[];
  CustomFields?: Record<string, any>;
}

export interface AssetReference {
  id: string;
  type: 'asset';
  _url: string;
}
