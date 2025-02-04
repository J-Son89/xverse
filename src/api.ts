import {OrdinalUtxo} from './types/ordinals';

const BASE_URL = 'https://api-3.xverse.app/v1';
const ORD_CONTENT_URL = 'https://ord.xverse.app/content';

export interface OrdinalUtxoResponse {
  results: OrdinalUtxo[];
  total: number;
}

export async function fetchOrdinalUtxos(
  address?: string,
  offset: number = 0,
  limit: number = 12
): Promise<OrdinalUtxoResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/address/${address}/ordinal-utxo?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching ordinal UTXOs: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      results: data.results,
      total: data.total,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchInscriptionDetails(
  address?: string,
  inscriptionId?: string
) {
  try {
    const response = await fetch(
      `${BASE_URL}/address/${address}/ordinals/inscriptions/${inscriptionId}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching inscription details: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchInscriptionContent(inscriptionId?: string) {
  try {
    const response = await fetch(`${ORD_CONTENT_URL}/${inscriptionId}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching inscription content: ${response.statusText}`
      );
    }
    return await response.blob();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
