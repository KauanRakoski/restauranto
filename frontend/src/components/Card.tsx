import React from 'react';
import styles from './css/Card.module.css';

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        {icon && <div className={styles.cardIcon}>{icon}</div>}
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardValue}>{value}</span>
        {trend && (
          <span className={`${styles.cardTrend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
