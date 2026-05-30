import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Package, Plus, Boxes, CircleDollarSign, LogOut, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import styles from './css/DashboardPage.module.css';
import logoSvg from '../assets/logo.svg';
import { Card } from '../components/Card';
import { Table } from '../components/Table';

const FAKE_ORDERS = [
  { id: '1042', customer: 'João Silva', items: 3, total: 'R$ 85,90', status: 'Preparando' as const },
  { id: '1043', customer: 'Maria Oliveira', items: 1, total: 'R$ 32,50', status: 'Saiu para entrega' as const },
  { id: '1044', customer: 'Carlos Santos', items: 5, total: 'R$ 145,00', status: 'Pronto' as const },
  { id: '1045', customer: 'Ana Costa', items: 2, total: 'R$ 68,00', status: 'Preparando' as const },
];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.workspaceInfo}>
            <img src={logoSvg} alt="Restauranto Logo" className={styles.workspaceIcon} />
            <span className={styles.workspaceName}>Restauranto</span>
          </div>
        </div>
        
        <nav className={styles.nav}>
          <div className={styles.navSection}>
            <span className={styles.sectionTitle}>Principal</span>
            <a href="#" className={`${styles.navItem} ${styles.active}`}>
              <Home className={styles.navIcon} />
              <span className={styles.navLabel}>Geral</span>
            </a>
            <a href="#" className={styles.navItem}>
              <Package className={styles.navIcon} />
              <span className={styles.navLabel}>Pedidos</span>
            </a>
            
            <button className={styles.fabBtn}>
              <div className={styles.fabIconWrapper}>
                <Plus className={styles.fabIcon} />
              </div>
              <span className={styles.navLabel + ' ' + styles.mobileHidden}>Adicionar</span>
            </button>
            
            <Link to="/inventory" className={styles.navItem}>
              <Boxes className={styles.navIcon} />
              <span className={styles.navLabel}>Inventário</span>
            </Link>
            <a href="#" className={styles.navItem}>
              <CircleDollarSign className={styles.navIcon} />
              <span className={styles.navLabel}>Financeiro</span>
            </a>
          </div>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut className={styles.navIcon} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Visão Geral</h1>
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
