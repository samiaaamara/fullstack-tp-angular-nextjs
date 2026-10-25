
export interface Appareil {
  _id: string;
  name: string;
  status: 'On' | 'Off';
  createdAt?: string;
  updatedAt?: string;
}

export interface AppareilInput {
  name: string;
  status: 'On' | 'Off';
}
