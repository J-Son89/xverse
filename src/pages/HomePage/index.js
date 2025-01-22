import { Header } from '../../components/Header'
import styles from './index.module.css'
import { Label } from '../../components/Label'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useAppState } from '../../appState'
import { useState } from 'react'
import { fetchOrdinalUtxos } from '../../api'
import { ListItem } from '../../components/ListItem'
import { get } from 'lodash'
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const navigateToNFT = (id) => {
        navigate(`/nftPage/${id}`);
      };

      
    const {address, setAddress} = useAppState()

    const [isSearching, setSearching] = useState("")
    const [ordinalUtxos, setOrdinalUtxos] = useState(null)

    const lookUpAddress = async () => {
        setSearching(true);
        try {
            const ordinals = await fetchOrdinalUtxos(address);
            setOrdinalUtxos(ordinals)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setTimeout(() => {
                setSearching(false);
            }, 1000);
        }
    };

    return <>
        <Header title={"Ordinal Inscription Lookup"} />
        <div className={styles.pageContainer}>
            <Label>Owner Bitcoin Address</Label>
            <span style={{ "marginTop": "10px" }}></span>
            <Input onChange={e => setAddress(e.target.value)} className={styles.input} value={address }></Input>
            <Button disabled={isSearching || address === ""} onClick={lookUpAddress} className={styles.button}>Look up</Button>
            {ordinalUtxos !== null && <Label>Results</Label>}
            {Array.isArray(ordinalUtxos) && ordinalUtxos.length
                && ordinalUtxos.map((r, i) => {
                    const inscriptionId = get(r, ['inscriptions', 0, 'id'])
                    const first_chars = inscriptionId.substring(0, 8);

                    return <ListItem key={inscriptionId} title={
                        "Inscription " + first_chars
                    } onClick={() => navigateToNFT(inscriptionId)}></ListItem>
                })}
        </div>
    </>
}
