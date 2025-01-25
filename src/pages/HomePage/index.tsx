import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import cx from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { Label, Input, Header, Button, ListItem, Loader } from '../../components';
import { fetchOrdinalUtxos } from '../../api';
import styles from './index.module.css';

const LIMIT = 12;

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const addressFromParams = searchParams.get('address') || '';
  const offsetFromParams = searchParams.get('offset') || '0';
  const [address, setAddress] = useState(addressFromParams);
  const offset = useRef(parseInt(offsetFromParams, 10));
  const [total, setTotal] = useState<number | null>(null);

  const queryKey = useMemo(() => ['ordinalUtxos', address, offset.current], [address, offset]);

  const { data: inscriptions, isLoading, isFetching, refetch } = useQuery(
    queryKey,
    async () => {
      const response = await fetchOrdinalUtxos(address, offset.current, LIMIT);
      setTotal(response.total);

      const filteredInscriptions = response.results.filter((r: any) => {
        const inscriptionId = get(r, ['inscriptions', 0, 'id']);
        return !!inscriptionId
      })
      return filteredInscriptions
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: () => {
        setSearchParams({ address, offset: offset.current.toString() });
      },
    }
  );


  const handleLookUp = () => {
    if (address.trim()) {
      offset.current = 0;
      setSearchParams({ address, offset: "0" });
      refetch();
    }
  };

  const handleLoadNext = () => {
    const newOffset = offset.current + LIMIT
    offset.current = newOffset
    setSearchParams({ address, offset: newOffset.toString() })
    refetch();
  };

  const handleLoadPrevious = () => {
    const newOffset = Math.max(0, offset.current - LIMIT)
    offset.current = newOffset
    setSearchParams({ address, offset: newOffset.toString() })
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [])

  return (
    <>
      <Header title={'Ordinal Inscription Lookup'} />
      <div className={styles.pageContainer}>
        <Label>Owner Bitcoin Address</Label>
        <span style={{ marginTop: '10px' }}></span>
        <Input
          onChange={(e) => setAddress(e.target.value)}
          className={styles.input}
          value={address}
        />
        <Button
          onClick={handleLookUp}
          className={styles.button}
        >
          Look up
        </Button>
        <Loader loading={isFetching} />
        {!isLoading && inscriptions && <Label>Results</Label>}

        {!isLoading &&
          inscriptions &&
          inscriptions.map((r: any) => {
            const inscriptionId = get(r, ['inscriptions', 0, 'id']);
            if (!inscriptionId) return null;
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

        {(
          <div className={styles.paginationButtons}>
            <Button
              onClick={handleLoadPrevious}
              disabled={!address || offset.current === 0}
              buttonType="secondary"
              className={cx(styles.previousButton, styles.button)}
            >
              Load Previous
            </Button>

            <Button
              onClick={handleLoadNext}
              disabled={!address || (offset.current === 0 && !inscriptions) || (total !== null && offset.current + LIMIT >= total) || (Array.isArray(inscriptions) && inscriptions.length < LIMIT)}
              buttonType="secondary"
              className={cx(styles.nextButton, styles.button)}
            >
              Load Next
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
