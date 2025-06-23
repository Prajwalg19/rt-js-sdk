export interface SearchCondition {
  field: string;
  operator?: string;
  value: any;
  entry_aggregator?: 'AND' | 'OR';
}

export interface SearchOptions {
  query?: SearchCondition[] | string;
  simple?: boolean;
  page?: number;
  per_page?: number;
  orderby?: string | string[];
  order?: 'ASC' | 'DESC' | ('ASC' | 'DESC')[];
  fields?: string | string[];
  find_disabled_rows?: boolean;
}
