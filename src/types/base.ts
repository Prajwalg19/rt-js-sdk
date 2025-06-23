export interface HypermediaLink {
  ref: string;
  _url: string;
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  from?: string;
  to?: string;
  update?: string;
}

export interface HypermediaResponse<T = any> {
  _hyperlinks?: HypermediaLink[];
  _url?: string;
  type?: string;
  id?: string | number;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  count: number;
  page: number;
  pages: number;
  per_page: number;
  total: number;
  next_page?: string;
  prev_page?: string;
  items: T[];
}

export interface CustomField {
  [fieldName: string]: string | string[] | CustomFieldFile | CustomFieldFile[] | null;
}

export interface CustomFieldFile {
  FileName: string;
  FileType: string;
  FileContent: string; // Base64 encoded
}

export interface CustomFieldValue {
  id: string;
  type: string;
  _url: string;
  name: string;
  values?: string[];
}

export interface Attachment {
  FileName: string;
  FileType: string;
  FileContent: string; // Base64 encoded
}
