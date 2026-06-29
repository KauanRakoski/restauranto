import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Sidebar } from '../components/Sidebar';
import styles from './css/OrdersPage.module.css';

const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: api.fetchOrders,
  });

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Pedidos</h1>
          <div className={styles.headerIcons}>
            <Bell className={styles.headerIcon} />
            <Link to="/settings" style={{ color: 'inherit', display: 'flex' }}>
              <Settings className={styles.headerIcon} />
            </Link>
          </div>
        </header>
        
        <div className={styles.content}>
          {isLoading && (
            <div className={styles.emptyState}>
              <p>Carregando pedidos...</p>
            </div>
          )}

          {error && (
            <div className={styles.emptyState}>
              <p>Erro ao carregar os pedidos. Tente novamente.</p>
            </div>
          )}

          {!isLoading && !error && (!orders || orders.length === 0) && (
            <div className={styles.emptyState}>
              <p>Nenhum pedido encontrado.</p>
            </div>
          )}

          {!isLoading && !error && orders && orders.length > 0 && (
            <div>
              {orders.map((order: any) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <div>
                      <div className={styles.orderId}>Pedido #{order.id.split('-')[0]}</div>
                      <div className={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <span className={`${styles.orderStatus} ${order.status === 'PENDING' ? styles.statusPending : styles.statusCompleted}`}>
                      {order.status === 'PENDING' ? 'Pendente' : 'Concluído'}
                    </span>
                  </div>

                  <ul className={styles.orderItems}>
                    {order.items.map((orderItem: any) => (
                      <li key={orderItem.id} className={styles.orderItem}>
                        <span className={styles.orderItemName}>{orderItem.item?.name || 'Item'}</span>
                        <span className={styles.orderItemQuantity}>x{orderItem.quantity}</span>
                        <span className={styles.orderItemPrice}>
                          R$ {Number(orderItem.unitPrice).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.orderTotal}>
                    <span>Total:</span>
                    <span>R$ {Number(order.totalAmount).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
