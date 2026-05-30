import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Package, Plus, Boxes, CircleDollarSign, LogOut, Bell, Settings, Edit2, Cloud, ChevronDown } from 'lucide-react';
import styles from './css/InventoryPage.module.css';
import logoSvg from '../assets/logo.svg';

const InventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'menu' | 'estoque'>('menu');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar - Duplicated for now to avoid large refactoring */}
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
            <Link to="/dashboard" className={styles.navItem}>
              <Home className={styles.navIcon} />
              <span className={styles.navLabel}>Geral</span>
            </Link>
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
            
            <Link to="/inventory" className={`${styles.navItem} ${styles.active}`}>
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
          <h1>Inventário</h1>
          <div className={styles.headerIcons}>
            <Bell className={styles.headerIcon} />
            <Settings className={styles.headerIcon} />
          </div>
        </header>
        
        <div className={styles.content}>
          <div className={styles.segmentedControl}>
            <button 
              className={`${styles.segmentBtn} ${activeTab === 'menu' ? styles.activeSegment : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              Itens do Menu
            </button>
            <button 
              className={`${styles.segmentBtn} ${activeTab === 'estoque' ? styles.activeSegment : ''}`}
              onClick={() => setActiveTab('estoque')}
            >
              Estoque
            </button>
          </div>

          {activeTab === 'menu' ? (
            <>
              <div className={styles.categoryGroup}>
                <div className={styles.categoryHeader}>
                  <h3>Bebidas</h3>
                  <ChevronDown className={styles.chevronIcon} />
                </div>
                
                <div className={styles.itemCard}>
                  <div className={`${styles.itemImagePlaceholder} ${styles.cocaColaImg}`}></div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>Coca-Cola Lata</span>
                    <span className={styles.itemPrice}>R$8,00</span>
                  </div>
                  <div className={styles.itemActions}>
                    <Edit2 className={styles.actionIcon} />
                    <div className={`${styles.toggle} ${styles.toggleActive}`}>
                      <div className={styles.toggleKnob}></div>
                    </div>
                  </div>
                </div>

                <div className={styles.itemCard}>
                  <div className={`${styles.itemImagePlaceholder} ${styles.sodaImg}`}></div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>Soda Italiana</span>
                    <span className={styles.itemPrice}>R$16,00</span>
                  </div>
                  <div className={styles.itemActions}>
                    <Edit2 className={styles.actionIcon} />
                    <div className={styles.toggle}>
                      <div className={styles.toggleKnob}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.categoryGroup}>
                <div className={styles.categoryHeader}>
                  <h3>Doces</h3>
                  <ChevronDown className={styles.chevronIcon} />
                </div>
                
                <div className={styles.itemCard}>
                  <div className={`${styles.itemImagePlaceholder} ${styles.croissantImg}`}></div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>Fornada de Croissant</span>
                    <span className={styles.itemPrice}>R$32,00</span>
                  </div>
                  <div className={styles.itemActions}>
                    <Edit2 className={styles.actionIcon} />
                    <div className={`${styles.toggle} ${styles.toggleActive}`}>
                      <div className={styles.toggleKnob}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.publishSection}>
                <div className={styles.publishHeader}>
                  <Cloud className={styles.cloudIcon} />
                  <h3>Publicar site?</h3>
                  <div className={`${styles.toggle} ${styles.toggleActive}`}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>
                <p className={styles.publishText}>
                  Caso esta opção esteja selecionada, um site será criado para expor o cardápio atualizado, permitindo que clientes façam pedidos
                </p>
                <div className={styles.publishLinkBox}>
                  <span className={styles.publishLinkText}>Seu site: <a href="#">https://restauranto.com.br/site</a></span>
                  <button className={styles.copyBtn}><Plus className={styles.copyIcon}/></button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>O controle de estoque está vazio no momento.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;
