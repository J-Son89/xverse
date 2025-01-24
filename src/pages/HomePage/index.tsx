import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Header} from '../../components/Header';
import styles from './index.module.css';
import {Label} from '../../components/Label';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {fetchOrdinalUtxos} from '../../api';
import {ListItem} from '../../components/ListItem';
import {get} from 'lodash';
import {OrdinalUtxo} from '../../types/ordinals';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const addressFromParams = searchParams.get('address') || '';
  const pageFromParams = parseInt(searchParams.get('page') || '0', 10);

  const [address, setAddress] = useState(addressFromParams);
  const [isSearching, setSearching] = useState(false);
  const [ordinalUtxos, setOrdinalUtxos] = useState<OrdinalUtxo[] | null>(null);
  const [currentPage, setCurrentPage] = useState(pageFromParams);

  const itemsPerPage = 8;

  const lookUpAddress = async () => {
    setSearching(true);

    setSearchParams({address});

    try {
      const ordinals = await fetchOrdinalUtxos(address);
      setOrdinalUtxos(ordinals);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setTimeout(() => {
        setSearching(false);
      }, 1000);
    }
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = ordinalUtxos?.slice(offset, offset + itemsPerPage);

  const handlePageChange = (selectedPage: {selected: number}) => {
    const newPage = selectedPage.selected;
    setCurrentPage(newPage);

    setSearchParams({address, page: String(newPage)});
  };

  useEffect(() => {
    if (addressFromParams) {
      lookUpAddress();
    }
  }, [addressFromParams, lookUpAddress]);

  return (
    <>
      <Header title={'Ordinal Inscription Lookup'} />
      <div className={styles.pageContainer}>
        <Label>Owner Bitcoin Address</Label>
        <span style={{marginTop: '10px'}}></span>
        <Input
          onChange={e => setAddress(e.target.value)}
          className={styles.input}
          value={address}
        />
        <Button
          disabled={isSearching || address === ''}
          onClick={lookUpAddress}
          className={styles.button}
        >
          Look up
        </Button>

        {ordinalUtxos !== null && <Label>Results</Label>}

        {Array.isArray(currentItems) &&
          currentItems.map(r => {
            const inscriptionId = get(r, ['inscriptions', 0, 'id']);
            const firstChars = inscriptionId.substring(0, 8);

            return (
              <ListItem
                key={inscriptionId}
                title={`Inscription ${firstChars}`}
                onClick={() =>
                  navigate(`/nftPage?id=${inscriptionId}&address=${address}`)
                }
              />
            );
          })}

        {Array.isArray(ordinalUtxos) && ordinalUtxos.length > itemsPerPage && (
          <ReactPaginate
            previousLabel={'←'}
            nextLabel={'→'}
            pageCount={Math.ceil(ordinalUtxos.length / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName={styles.paginationContainer}
            activeClassName={styles.activePage}
            pageClassName={styles.hidden}
            pageLinkClassName={styles.hidden}
            previousClassName={styles.page}
            nextClassName={styles.page}
            disabledClassName={styles.disabledPage}
          />
        )}
      </div>
    </>
  );
};
