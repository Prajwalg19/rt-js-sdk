import {HypermediaLink, HypermediaResponse} from "./base";
import {UserReference} from "./user.types";

export interface QueueReference {
  id: string;
  type: 'queue';
  _url: string;
}

export interface GroupReference {
  id: string;
  _url: string;
  type: 'group';
}

export interface CustomFieldReference {
  type: 'customfield';
  _url: string;
  ref: string;
  id: string;
  name: string;
}

export interface Queue extends HypermediaResponse {
  TicketTransactionCustomFields: unknown[];
  SortOrder: string;
  id: number;
  LastUpdatedBy: UserReference;
  SLADisabled: string;
  TicketCustomFields: CustomFieldReference[];
  Creator: UserReference;
  Cc: unknown[];
  Disabled: string;
  CorrespondAddress: string;
  CommentAddress: string;
  CustomFields: unknown[];
  Lifecycle: string;
  SubjectTag: string;
  AdminCc: GroupReference[];
  Name: string;
  Description: string;
  LastUpdated: string;
  Created: string;
}

