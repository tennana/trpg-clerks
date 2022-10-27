export const OUTPUT_TYPE = {
  JSON: 2,
  JSON_ZIP: 3,
  CSV: 4,
  CSV_ZIP: 5,
  HTML: 8,
  HTML_ZIP: 9,
} as const;
export type OUTPUT_TYPE = typeof OUTPUT_TYPE[keyof typeof OUTPUT_TYPE];

export interface JsonMessage {
  name: string;
  body: string;
  iconUrl: string;
}

export interface ResponseMessage {
  type: 'ccfolia';
  messages: JsonMessage[];
}
