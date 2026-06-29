import React from 'react';

import { ShoppingBag, DollarSign, TrendingUp, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './css/DashboardPage.module.css';
import { Sidebar } from '../components/Sidebar';
import { Card } from '../components/Card';
import { Table } from '../components/Table';

const FAKE_ORDERS = [
  { id: '1042', customer: 'João Silva', items: 3, total: 'R$ 85,90', status: 'Preparando' as const },
  { id: '1043', customer: 'Maria Oliveira', items: 1, total: 'R$ 32,50', status: 'Saiu para entrega' as const },
  { id: '1044', customer: 'Carlos Santos', items: 5, total: 'R$ 145,00', status: 'Pronto' as const },
  { id: '1045', customer: 'Ana Costa', items: 2, total: 'R$ 68,00', status: 'Preparando' as const },
];

const DashboardPage: React.FC = () => {




  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Visão Geral</h1>
          <div className={styles.headerIcons}>
            <Bell className={styles.headerIcon} />
            <Link to="/settings" style={{ color: 'inherit', display: 'flex' }}>
              <Settings className={styles.headerIcon} />
            </Link>
          </div>
        </header>
        <div className={styles.content}>
          <div className={styles.cardsGrid}>
            <Card 
              title="Pedidos nesta semana" 
              value="142" 
              icon={<ShoppingBag />} 
              trend="+12% em relação a semana passada" 
              trendUp={true} 
            />
            <Card 
              title="Faturamento Mensal" 
              value="R$ 12.450" 
              icon={<DollarSign />} 
              trend="+5% em relação ao mês passado" 
              trendUp={true} 
            />
            <Card 
              title="Lucro Líquido" 
              value="R$ 4.230" 
              icon={<TrendingUp />} 
              trend="-2% em relação ao mês passado" 
              trendUp={false} 
            />
          </div>

          <div className={styles.tableSection}>
            <h2 className={styles.sectionTitleContent}>Pedidos em Andamento</h2>
            <Table data={FAKE_ORDERS} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
