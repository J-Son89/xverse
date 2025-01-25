import React, { useState, useMemo } from 'react';
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
  const [offset, setOffset] = useState(parseInt(offsetFromParams, 10));
  const queryKey = useMemo(() => ['ordinalUtxos', address, offset], [address, offset]);

  const { data, isLoading, isFetching, refetch } = useQuery(
    queryKey,
    () => fetchOrdinalUtxos(address, offset, LIMIT),
    {
      enabled: !!address,
      keepPreviousData: false,
      onSuccess: () => {
        setSearchParams({ address, offset: offset.toString() });
      },
    }
  );

  const handleLookUp = () => {
    if (address.trim()) {
      setOffset(0);
      refetch();
    }
  };

  const handleLoadNext = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
    refetch();
  };

  const handleLoadPrevious = () => {
    setOffset((prevOffset) => Math.max(0, prevOffset - LIMIT));
    refetch();
  };
  console.log(offset, "OFFSET", typeof offset)
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
          disabled={isFetching || address === ''}
          onClick={handleLookUp}
          className={styles.button}
        >
          Look up
        </Button>
        <Loader loading={( isFetching)} />

        {!isLoading && data && <Label>Results</Label>}

        {!isLoading &&
          data &&
          data.map((r) => {
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

        {!isLoading && <div className={styles.paginationButtons}>
          <Button
            onClick={handleLoadPrevious}
            disabled={isFetching || offset === 0}
            buttonType="secondary"
            className={cx(styles.previousButton, styles.button)}
          >
            Load Previous
          </Button>

          <Button
            onClick={handleLoadNext}
            disabled={isFetching || (data && data.length < LIMIT)}
            buttonType="secondary"
            className={cx(styles.nextButton, styles.button)}
          >
            {isFetching ? 'Loading...' : 'Load Next'}
          </Button>
        </div>}
      </div>
    </>
  );
};
