import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

export const NFTImage = ({ data, contentType }) => {
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

          // Try to parse JSON and format it, fallback to raw text if parsing fails
          try {
            const parsedJson = JSON.parse(text);
            setFormattedContent(JSON.stringify(parsedJson, null, 2)); // Prettify JSON
          } catch {
            setFormattedContent(text); // If not JSON, just use the raw text
          }
        } catch (err) {
          setError(err.message);
        }
      };

      fetchTextContent();
    }
  }, [data, contentType]);

  if (contentType.startsWith('text')) {
    if (error) {
      return <div className={styles.error}>Error: {error}</div>;
    }
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
    return <img src={data} alt="NFT Content" className={styles.image} />;
  }

  return <div className={styles.unsupported}>Unsupported content type</div>;
};
