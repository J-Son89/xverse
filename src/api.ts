import { OrdinalUtxo } from './types/ordinals'

const BASE_URL = 'https://api-3.xverse.app/v1';
const ORD_CONTENT_URL = 'https://ord.xverse.app/content';

export interface OrdinalUtxoResponse {
  results: OrdinalUtxo[];
}

export async function fetchOrdinalUtxos(address?: string): Promise<OrdinalUtxo[]> {
  try {
    const response = await fetch(`${BASE_URL}/address/${address}/ordinal-utxo`);
    if (!response.ok) {
      throw new Error(`Error fetching ordinal UTXOs: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchInscriptionDetails(address?: string, inscriptionId?: string) {
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
    return await response.blob(); // Returns the content as a blob (e.g., image, text).
  } catch (error) {
    console.error(error);
    throw error;
  }
}
