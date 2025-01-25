interface Inscription {
  id: string;
  offset: number;
  content_type: string;
}

export interface OrdinalUtxo {
  txid: string;
  vout: number;
  block_height: number;
  value: number;
  sats: any[]; 
  inscriptions: Inscription[];
}
