import React from 'react';
import styles from './css/Table.module.css';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: 'Preparando' | 'Pronto' | 'Saiu para entrega';
}

interface TableProps {
  data: Order[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Preparando': return styles.statusPreparando;
      case 'Pronto': return styles.statusPronto;
      case 'Saiu para entrega': return styles.statusEntregando;
      default: return styles.statusDefault;
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={`${styles.tableHeader} ${styles.gridStandard}`}>
        <div>ID</div>
        <div style={{ justifySelf: 'start' }}>CLIENTE</div>
        <div>ITENS</div>
        <div>TOTAL</div>
        <div>STATUS</div>
      </div>
      
      <div className={styles.tableBody}>
        {data.map((order) => (
          <div key={order.id} className={`${styles.tableRow} ${styles.gridStandard}`}>
            <div className={styles.colId}>#{order.id}</div>
            <div className={styles.colCustomer}>{order.customer}</div>
            <div className={styles.colItems}>{order.items}</div>
            <div className={styles.colTotal}>{order.total}</div>
            <div className={styles.colStatus}>
              <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className={styles.emptyRow}>Nenhum pedido aberto no momento.</div>
        )}
      </div>
    </div>
  );
};
