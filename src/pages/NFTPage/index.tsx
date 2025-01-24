//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchInscriptionDetails, fetchInscriptionContent } from '../../api';
import { Header } from '../../components/Header';
import { InputLabel } from '../../components/InputLabel';
import { Divider } from '../../components/Divider';
import styles from './index.module.css';
import { Label } from '../../components/Label';
import { NFTImage } from '../../components/NFTImage';
import { Loader } from '../../components/Loader';

export const NFTPage = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get('address');
  const id = searchParams.get('id');

  const [nftData, setNftData] = useState(null);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [_imageError, setImageError] = useState(null);

  useEffect(() => {
    if (!address) {
      setError('Address not provided in the URL.');
      setLoading(false);
      return;
    }

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

            <Label className={styles.smallLabel} size="small">Inscription ID</Label>
            <Label>{id}</Label>
            <span style={{ marginTop: '24px' }}></span>

            <Label className={styles.smallLabel} size="small">Owner Address</Label>
            <Label>{nftData.address}</Label>

            <span style={{ marginTop: '48px' }}></span>
            <Label size="large">Attributes</Label>
            <span style={{ marginTop: '32px' }}></span>

            <Label size="small">Output Value</Label>
            <InputLabel className={styles.input}>{nftData.output}
            </InputLabel>

            <Label size="small">Content Type</Label>
            <InputLabel className={styles.input}>
              {nftData.content_type}
            </InputLabel>

            <Label size="small">Content Length</Label>
            <InputLabel className={styles.input}>
              {nftData.content_length}
            </InputLabel>

            <Label size="small">Location</Label>
            <InputLabel className={styles.input}>
              {nftData.location}
            </InputLabel>

            <Label size="small">Genesis Transaction</Label>
            <InputLabel className={styles.input}>
              {nftData.genesis_tx_id}
            </InputLabel>
          </div>
        </>
      )}
    </>
  );
};
