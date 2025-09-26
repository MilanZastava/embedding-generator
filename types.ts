export interface Embedding {
  id: string;
  source: string; // filename
  vector: number[];
  type: 'text' | 'image';
  timestamp: number;
}

export enum ModelType {
  Text = 'text',
  // FIX: Changed value from 'vision' to 'image' to match the 'type' property in the 'Embedding' interface.
  Vision = 'image'
}
