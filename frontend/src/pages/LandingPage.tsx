import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/LandingPage.module.css';
import logoSvg from '../assets/logo.svg';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoSvg} alt="Restauranto Logo" className={styles.logoImg} />
          <span className={styles.logoText}>Restauranto</span>
        </div>
        <nav className={styles.nav}>
          <Link to="/login" className={styles.loginBtn}>Acessar Sistema</Link>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className={styles.heroText}>
            <h1>O ERP Definitivo para o seu <span>Restaurante</span></h1>
            <p>
              Tudo o que você precisa em um só lugar. Centralize seus pedidos de delivery, gere seu cardápio digital online em segundos e acompanhe suas vendas com relatórios analíticos poderosos.
            </p>
            <div className={styles.ctaGroup}>
              <Link to="/login" className={styles.primaryBtn}>Comece Agora</Link>
              <a href="#features" className={styles.secondaryBtn}>Saiba Mais</a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.dashboardMockup}>
              <div className={styles.mockupHeader}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.mockupBody}>
                <div className={styles.mockupSidebar}></div>
                <div className={styles.mockupContent}>
                  <div className={styles.mockupCard}></div>
                  <div className={styles.mockupCard}></div>
                  <div className={styles.mockupChart}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <h2>Recursos Projetados para o Sucesso</h2>
            <p>Escale seu negócio com ferramentas modernas e fáceis de usar.</p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📋</div>
              <h3>Cardápio Digital Online</h3>
              <p>Gere automaticamente um cardápio atrativo acessível via link e receba pedidos online instantaneamente.</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📈</div>
              <h3>Relatórios e Analytics</h3>
              <p>Visualize dados de vendas, pratos mais vendidos e fluxo de caixa em tempo real para tomar melhores decisões.</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3>Integração com WhatsApp</h3>
              <p>Receba pedidos formatados diretamente no WhatsApp, facilitando a comunicação com os clientes e otimizando o seu delivery.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Restauranto ERP. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
