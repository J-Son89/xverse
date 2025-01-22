import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInscriptionDetails } from '../../api'
import { useAppState } from '../../appState'


export const NFTPage = () => {
  const {id}= useParams(); 
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {address} = useAppState()


  useEffect(() => {
    const fetchNFTDetails = async () => {
      try {
        setLoading(true);
     
        const response = await fetchInscriptionDetails(address, id);
        if (!response.ok) {
          throw new Error('Failed to fetch NFT details');
        }
        const data = await response.json();
        setNftData(data);
        console.log("**",data)

      } catch (err) {
        setError(err.message); 
        setLoading(false);
      }
    };

    fetchNFTDetails();
  }, [id]); 

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  return (
    <div>
      <h1>NFT Page</h1>
      <p>Displaying details for NFT with ID: {id}</p>
      <pre>{JSON.stringify(nftData, null, 2)}</pre> 
    </div>
  );
};
