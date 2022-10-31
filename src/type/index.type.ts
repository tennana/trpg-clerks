export interface JsonMessage {
  name: string;
  body: string;
  iconUrl: string;
}

export interface ResponseMessage {
  type: 'ccfolia';
  messages: JsonMessage[];
}
