import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

export const NFTImage = ({ data, contentType="" }) => {
  const [content, setContent] = useState(null);
  const [formattedContent, setFormattedContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contentType.startsWith('text')) {
      const fetchTextContent = async () => {
        try {
          const response = await fetch(data);
          const text = await response.text();
          setContent(text);

          try {
            const parsedJson = JSON.parse(text);
            setFormattedContent(JSON.stringify(parsedJson, null, 2));
          } catch {
            setFormattedContent(text);
          }
        } catch (err) {
          setError(err.message);
        }
      };

      fetchTextContent();
    } else if (contentType.startsWith('image')) {
      setContent(data); // For images (GIFs, JPEG, PNG), use the data as-is
    }
  }, [data, contentType]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (contentType.startsWith('text')) {
    if (!formattedContent) {
      return <div className={styles.placeholder}>Loading content...</div>;
    }
    return (
      <pre className={styles.textContent}>
        {formattedContent}
      </pre>
    );
  }

  if (contentType.startsWith('image')) {
    return (
      <img
        src={content}
        alt="NFT Content"
        className={styles.image}
        loading="lazy" 
      />
    );
  }

  return <div className={styles.unsupported}>Unsupported content type</div>;
};
