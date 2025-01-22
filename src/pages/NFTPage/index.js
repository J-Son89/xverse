import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchInscriptionDetails } from '../../api'
import { useAppState } from '../../appState'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Divider } from '../../components/Divider'
import styles from './index.module.css'
import { Label } from '../../components/Label'
import { get } from 'lodash'

export const NFTPage = () => {
  const { id } = useParams();
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { address } = useAppState()


  useEffect(() => {
    const fetchNFTDetails = async () => {
      try {
        setLoading(true);

        const data = await fetchInscriptionDetails(address, id);

        setNftData(data);
        console.log("**", data)

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
      finally {
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

  return <>
    <Header title={"Details"} />

    { !nftData ? <div>... Loading</div> :
      <>
        <div className={styles.image}></div>

        <div className={styles.pageContainer}>
          <Label size='large' >Inscription {nftData.number}</Label>
          <Divider />

          <Label size='small' >Inscription ID</Label>
          <Label > </Label>
          <span style={{"margin-top": "24px"}}></span>

          <Label size='small' >Owner Address</Label>
          <Label> {nftData.address}</Label>
          
          <span style={{"margin-top": "48px"}}></span>
          <Label size='large' >Attributes</Label>
          <span style={{"margin-top": "32px"}}></span>

          <Label size='small' >Output Value</Label>
          <Input className={styles.input} value={nftData.output}  readOnly></Input>

          <Label size='small' >Content Type</Label>
          <Input className={styles.input} value={nftData.content_type}  readOnly></Input>

          <Label size='small' >Content Length</Label>
          <Input className={styles.input} value={nftData.content_length}  readOnly></Input>

          <Label size='small' >Location</Label>
          <Input className={styles.input} value={nftData.location}  readOnly></Input>

          <Label size='small' >Genesis Transaction</Label>
          <Input className={styles.input} value={nftData.genesis_tx_id}  readOnly></Input>
        </div>
      </>
    }
  </>

};
