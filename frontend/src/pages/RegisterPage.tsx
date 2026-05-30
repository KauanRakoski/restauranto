import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './css/LoginPage.module.css';
import bgImage from '../assets/login_background.jpg';
import { api } from '../services/api';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/register', { name, email, password });

      if (response.ok || response.status === 201) {
        navigate('/login');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao registrar usuário');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro durante o registro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer} style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={styles.loginOverlay}></div>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Crie sua conta</h1>
          <p>Preencha os dados para se registrar</p>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form className={styles.loginForm} onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome Completo</label>
            <div className={styles.inputWrapper}>
              <input 
                id="name"
                type="text" 
                placeholder="Seu nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Endereço de E-mail</label>
            <div className={styles.inputWrapper}>
              <input 
                id="email"
                type="email" 
                placeholder="seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.inputWrapper}>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>
          
          <button type="submit" className={styles.loginBtn} disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/login" style={{ color: '#a1a1aa', fontSize: '0.9rem', textDecoration: 'none' }}>
              Já possui uma conta? Faça login.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;