import {Attachment, CustomField, HypermediaResponse} from "./base";
import {QueueReference} from "./queues.types";
import {UserReference} from "./user.types";

export interface Ticket extends HypermediaResponse {
  id: number;
  Subject?: string;
  Status?: string;
  Queue?: string | QueueReference;
  Owner?: string | UserReference;
  Requestor?: string[];
  Cc?: string[];
  Bcc?: string[];
  Created?: string;
  Due?: string;
  Resolved?: string;
  Priority?: number;
  InitialPriority?: number;
  FinalPriority?: number;
  TimeEstimated?: number;
  TimeWorked?: number;
  TimeLeft?: number;
  Content?: string;
  ContentType?: string;
  CustomFields?: Record<string, any>;
  Type : "ticket"
  Starts : 'string';
}

export interface TicketCreateRequest {
  Queue: string | number;
  Subject?: string;
  Content?: string;
  ContentType?: string;
  Requestor?: string | string[];
  Cc?: string | string[];
  Bcc?: string | string[];
  Status?: string;
  Priority?: number;
  Due?: string;
  Owner?: string;
  CustomFields?: CustomField;
  Attachments?: Attachment[];
}

export interface TicketUpdateRequest {
  Subject?: string;
  Status?: string;
  Priority?: number;
  Queue?: string | QueueReference;
  Owner?: string;
  Due?: string;
  CustomFields?: CustomField;
}

export interface CorrespondRequest {
  Subject?: string;
  Content?: string;
  ContentType?: string;
  TimeTaken?: number;
  Attachments?: Attachment[];
  CustomFields?: CustomField;
  TxnCustomFields?: CustomField;
}


export interface TicketReference {
  id: string;
  type: 'ticket';
  _url: string;
}

export interface CommentRequest extends CorrespondRequest {}


