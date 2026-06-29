import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ShoppingCart, Plus, Minus, Check, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import styles from './css/NewOrderPage.module.css';

interface CartItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
}

export default function POSPage() {
  const [restaurantId, setRestaurantId] = useState<string>('');
  const [categories, setCategories] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const rest = await api.fetchMyRestaurant();
        setRestaurantId(rest.id);

        const menuData = await api.fetchMenuItems();
        setCategories(menuData);
      } catch (err) {
        console.error("Erro ao carregar dados", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.itemId === item.id);
      if (existing) {
        return prev.map((i) => i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { itemId: item.id, name: item.name, price: Number(item.price), quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.itemId === itemId);
      if (existing?.quantity === 1) {
        return prev.filter((i) => i.itemId !== itemId);
      }
      return prev.map((i) => i.itemId === itemId ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const submitOrder = async () => {
    if (cart.length === 0) return alert('O carrinho está vazio!');

    try {
      const payload = {
        restaurantId,
        items: cart.map(c => ({ itemId: c.itemId, quantity: c.quantity }))
      };

      await api.createOrder(payload);
      alert('Pedido criado com sucesso!');
      setCart([]); // Limpa o carrinho
    } catch (err: any) {
      alert(err.message || 'Erro ao criar pedido');
    }
  };

  const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  // Removido o early return do loading para evitar que a tela inteira (incluindo o Sidebar) pisque.

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Novo Pedido</h1>
          <div className={styles.headerIcons}>
            <Bell className={styles.headerIcon} />
            <Link to="/settings" style={{ color: 'inherit', display: 'flex' }}>
              <Settings className={styles.headerIcon} />
            </Link>
          </div>
        </header>

        {loading ? (
          <div className={styles.posContainer} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ color: '#8e8e93', fontSize: '1.1rem' }}>Carregando PDV...</p>
          </div>
        ) : (
          <div className={styles.posContainer}>
          {/* Lado Esquerdo: Cardápio */}
          <div className={styles.menuSection}>
            <h2 className={styles.sectionTitle}>Cardápio</h2>
            {categories.map((cat, idx) => (
              <div key={idx} style={{ marginBottom: '2rem' }}>
                <h3 className={styles.categoryTitle}>{cat.categoryName}</h3>
                <div className={styles.itemsGrid}>
                  {cat.items.map((item: any) => (
                    <div key={item.id} className={styles.itemCard}>
                      <h4>{item.name}</h4>
                      <p>R$ {Number(item.price).toFixed(2)}</p>
                      <button onClick={() => addToCart(item)} className={styles.addButton}>
                        <Plus size={16} /> Adicionar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lado Direito: Carrinho / Resumo */}
          <div className={styles.cartSection}>
            <h2 className={styles.cartTitle}>
              <ShoppingCart /> Novo Pedido
            </h2>

            {cart.length === 0 ? (
              <p className={styles.emptyCart}>Selecione itens no cardápio</p>
            ) : (
              <div className={styles.cartContent}>
                <ul className={styles.cartList}>
                  {cart.map((c) => (
                    <li key={c.itemId} className={styles.cartItem}>
                      <div className={styles.cartItemDetails}>
                        <strong>{c.name}</strong> <br />
                        <small>R$ {c.price.toFixed(2)}</small>
                      </div>
                      <div className={styles.cartItemControls}>
                        <button onClick={() => removeFromCart(c.itemId)} className={styles.iconButton}><Minus size={16} /></button>
                        <span>{c.quantity}</span>
                        <button onClick={() => addToCart({ id: c.itemId, name: c.name, price: c.price })} className={styles.iconButton}><Plus size={16} /></button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className={styles.cartTotal}>
                  <h3>Total:</h3>
                  <h3>R$ {total.toFixed(2)}</h3>
                </div>
                <button
                  onClick={submitOrder}
                  className={styles.submitButton}
                >
                  <Check /> Confirmar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
        )}
      </main>
    </div>
  );
}
