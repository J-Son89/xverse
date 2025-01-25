import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {fetchInscriptionDetails, fetchInscriptionContent} from '../../api';
import {Header, InputLabel, Divider, Label, NFTImage} from '../../components';
import styles from './index.module.css';

interface NFTData {
  content_type: string;
  number: string;
  address: string;
  output: string;
  content_length: string;
  genesis_tx_id: string;
  location: string;
}

type ImageData = string;

export const NFTPage = () => {
  const [searchParams] = useSearchParams();
  const address = searchParams.get('address');
  const id = searchParams.get('id') || '';

  const [nftData, setNftData] = useState<NFTData>({
    content_type: '',
    number: '',
    address: '',
    output: '',
    content_length: '',
    genesis_tx_id: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [imageData, setImageData] = useState<ImageData>('');
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (error) {
      setNftData({
        content_type: '',
        number: '',
        address: '',
        output: '',
        content_length: '',
        genesis_tx_id: '',
        location: '',
      });
    }
  }, [error]);

  useEffect(() => {
    if (!address) {
      setError('Address not provided in the URL.');
      return;
    }

    const fetchNFTDetails = async () => {
      try {
        const data = await fetchInscriptionDetails(address, id);
        setNftData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
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
      } catch {
        setImageData('error');
      } finally {
        setImageLoading(false);
      }
    };

    fetchNFTImage();
  }, [id]);

  return (
    <>
      <Header title={'Details'} backButton />

      <>
        <NFTImage
          loading={imageLoading}
          data={imageData}
          contentType={nftData.content_type}
        ></NFTImage>

        <div className={styles.pageContainer}>
          <Label size="large">{`Inscription ${nftData.number}`}</Label>
          <Divider />

          <Label className={styles.smallLabel} size="small">
            Inscription ID
          </Label>
          <Label>{id || 'Null'}</Label>
          <span style={{marginTop: '24px'}}></span>

          <Label className={styles.smallLabel} size="small">
            Owner Address
          </Label>
          <Label>{nftData.address || 'Null'}</Label>

          <span style={{marginTop: '48px'}}></span>
          <Label size="large">Attributes</Label>
          <span style={{marginTop: '32px'}}></span>

          <Label size="small">Output Value</Label>
          <InputLabel className={styles.input}>
            {nftData.output || 'Null'}
          </InputLabel>

          <Label size="small">Content Type</Label>
          <InputLabel className={styles.input}>
            {nftData.content_type || 'Null'}
          </InputLabel>

          <Label size="small">Content Length</Label>
          <InputLabel className={styles.input}>
            {nftData.content_length || 'Null'}
          </InputLabel>

          <Label size="small">Location</Label>
          <InputLabel className={styles.input}>
            {nftData.location || 'Null'}
          </InputLabel>

          <Label size="small">Genesis Transaction</Label>
          <InputLabel className={styles.input}>
            {nftData.genesis_tx_id || 'Null'}
          </InputLabel>
        </div>
      </>
    </>
  );
};
