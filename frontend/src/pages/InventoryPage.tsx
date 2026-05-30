import React, { useState, useEffect } from 'react';

import { Bell, Settings, Edit2, ChevronDown, Plus } from 'lucide-react';
import styles from './css/InventoryPage.module.css';
import modalStyles from '../components/css/CreateItemModal.module.css';
import { CreateItemModal } from '../components/CreateItemModal';
import { Sidebar } from '../components/Sidebar';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

const InventoryPage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<'menu' | 'estoque'>('menu');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['menuItems'],
    queryFn: api.fetchMenuItems
  });

  useEffect(() => {
    if (error) {
      console.error('[InventoryPage] Falha na comunicação com a API:', error);
    }
  }, [error]);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />

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
            <div>
              {!isLoading && !error && data?.map((category: any) => (
                  <div className={styles.categoryGroup}>
                  <div className={styles.categoryHeader}>
                    <h3>{category.categoryName}</h3>
                    <ChevronDown className={styles.chevronIcon} />
                  </div>

                  {category.items.map((item: any) => (
                    <div className={styles.itemCard} key={item.id}>
                      <div className={`${styles.itemImagePlaceholder} ${styles.cocaColaImg}`}></div>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemPrice}>R$ {item.price} </span>
                      </div>
                      <div className={styles.itemActions}>
                        <Edit2 className={styles.actionIcon} />
                        <div className={`${styles.toggle} ${styles.toggleActive}`}>
                          <div className={styles.toggleKnob}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
              ))}
              
              {isLoading && <div className={styles.emptyState}><p>Carregando as opções do menu...</p></div>}
              
              {error && <div className={styles.emptyState}><p>Erro ao carregar os itens. Tente novamente.</p></div>}
              
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>O controle de estoque está vazio no momento.</p>
            </div>
          )}
        </div>

        <button 
          className={modalStyles.inventoryFab}
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className={modalStyles.fabIcon} />
        </button>

        <CreateItemModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onItemCreated={() => {
            refetch();
          }} 
        />
      </main>
    </div>
  );
};

export default InventoryPage;