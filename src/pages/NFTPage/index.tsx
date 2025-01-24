//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchInscriptionDetails, fetchInscriptionContent} from '../../api';
import {useAppState} from '../../appState';
import {Header} from '../../components/Header';
import {Input} from '../../components/Input';
import {Divider} from '../../components/Divider';
import styles from './index.module.css';
import {Label} from '../../components/Label';
import {NFTImage} from '../../components/NFTImage';
import {Loader} from '../../components/Loader';

export const NFTPage = () => {
  const {id} = useParams();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //@ts-ignore
  const {address} = useAppState();
  const [imageData, setImageData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [_imageError, setImageError] = useState(null);

  useEffect(() => {
    const fetchNFTDetails = async () => {
      try {
        setLoading(true);

        const data = await fetchInscriptionDetails(address, id);

        setNftData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); 
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false)
      } finally {
        setLoading(false);
      }
    };

    fetchNFTDetails();
  }, [id, address]);

  useEffect(() => {
    const fetchNFTImage = async () => {
      try {
        setImageLoading(true);
        const blob = await fetchInscriptionContent(id);
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } catch (err) {
        setImageError(err.message);
      } finally {
        setImageLoading(false);
      }
    };

    fetchNFTImage();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header title={'Details'} backButton />

      {!nftData ? (
        <Loader />
      ) : (
        <>
          {imageLoading ? (
            <Loader />
          ) : (
            <NFTImage
              className={styles.image}
              data={imageData}
              contentType={nftData.content_type}
            ></NFTImage>
          )}

          <div className={styles.pageContainer}>
            <Label size="large">{`Inscription ${nftData.number}`}</Label>
            <Divider />

            <Label size="small">Inscription ID</Label>
            <Label> </Label>
            <span style={{marginTop: '24px'}}></span>

            <Label size="small">Owner Address</Label>
            <Label>{nftData.address}</Label>

            <span style={{marginTop: '48px'}}></span>
            <Label size="large">Attributes</Label>
            <span style={{marginTop: '32px'}}></span>

            <Label size="small">Output Value</Label>
            <Input
              className={styles.input}
              value={nftData.output}
              readOnly
            ></Input>

            <Label size="small">Content Type</Label>
            <Input
              className={styles.input}
              value={nftData.content_type}
              readOnly
            ></Input>

            <Label size="small">Content Length</Label>
            <Input
              className={styles.input}
              value={nftData.content_length}
              readOnly
            ></Input>

            <Label size="small">Location</Label>
            <Input
              className={styles.input}
              value={nftData.location}
              readOnly
            ></Input>

            <Label size="small">Genesis Transaction</Label>
            <Input
              className={styles.input}
              value={nftData.genesis_tx_id}
              readOnly
            ></Input>
          </div>
        </>
      )}
    </>
  );
};
