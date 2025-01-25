import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

interface NFTImageProps {
  loading: boolean;
  data: string;
  contentType: string;
}

export const NFTImage: React.FC<NFTImageProps> = ({ data, contentType = '', loading }) => {
  console.log(contentType);
  const [content, setContent] = useState<string>("");
  const [formattedContent, setFormattedContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (typeof contentType == 'string' && contentType.startsWith('text')) {
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
        } catch {
          setError("Error fetching text");
        }
      };

      fetchTextContent();
    } else if (contentType === 'text/html') {
      const fetchHTMLContent = async () => {
        try {
          const response = await fetch(data);
          const html = await response.text();
          setContent(html);
        } catch {
          setError("Error fetching text");
        }
      };

      fetchHTMLContent();
    } else if (
      typeof contentType == 'string' &&
      contentType.startsWith('image')
    ) {
      setContent(data);
    }
  }, [data, contentType]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (contentType === 'text/html') {
    if (!content) {
      return <div className={styles.placeholder}>Loading HTML...</div>;
    }
    return (
      <div
        className={styles.htmlContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  if (typeof contentType == 'string' && contentType.startsWith('text')) {
    if (!formattedContent) {
      return <div className={styles.placeholder}>Loading content...</div>;
    }
    return <pre className={styles.textContent}>{formattedContent}</pre>;
  }

  if (
    typeof contentType == 'string' &&
    contentType.startsWith('image') &&
    content !== null
  ) {
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
