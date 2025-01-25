import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { ClipLoader } from 'react-spinners';
import cx from 'classnames';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { json } from 'react-router';

interface NFTImageProps {
  loading: boolean;
  data: string;
  contentType: string;
}

export const NFTImage: React.FC<NFTImageProps> = ({ data, contentType, loading }) => {
  const [content, setContent] = useState<string>("");
  const [formattedContent, setFormattedContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [innerLoading, setInnerLoading] = useState<boolean>(true);

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
        finally {
          setInnerLoading(false)
        }
      };

      fetchTextContent();
    } else if (contentType === 'text/html') {
      const fetchHTMLContent = async () => {
        try {
          const response = await fetch(data);
          const html = await response.text();
          const sanitizedHtml = DOMPurify.sanitize(html);
          const parser = new DOMParser();
          const doc = parser.parseFromString(sanitizedHtml, 'text/html');
          setContent(doc.body.innerHTML || sanitizedHtml);
          setInnerLoading(false)

        } catch {
          setError("Error fetching HTML");
        }
        finally {
          setInnerLoading(false)
        }
      };

      fetchHTMLContent();
    } else if (typeof contentType == 'string' && contentType.startsWith('image')) {
      setContent(data);
      setInnerLoading(false)

    }
    else {
      setTimeout(() => {
        setInnerLoading(false)
      }, 1000);
    }

  }, [data, contentType]);

  if (loading || innerLoading) {
    return <div className={cx(styles.base, styles.loading)}>
      <ClipLoader color="#5A5AFF" size={50} />
    </div>;
  }

  if (error) {
    return <div className={cx(styles.base, styles.error)}>Error: {error}</div>;
  }

  if (contentType === 'text/html') {
    return (
      <div
        className={cx(styles.base, styles.htmlContent)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  if (typeof contentType == 'string' && contentType.startsWith('text')) {
    return <pre className={cx(styles.base, styles.textContent)}>{formattedContent}</pre>;
  }

  if (typeof contentType == 'string' && contentType.startsWith('image')) {
    return (
      <img
        src={content}
        alt="NFT Content"
        className={cx(styles.base, styles.image)}
        loading="lazy"
      />
    );
  }

  return <div className={cx(styles.base, styles.unsupported)}>Unsupported content type</div>;
};
