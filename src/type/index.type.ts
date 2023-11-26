export interface JsonMessage {
  name: string;
  body: string;
  iconUrl: string;
  color?: string;
}

export interface ResponseMessage {
  type: 'ccfolia';
  messages: JsonMessage[];
}
