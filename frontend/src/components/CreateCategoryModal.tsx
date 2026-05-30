import React, { useState } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';
import styles from './css/CreateCategoryModal.module.css';
import { api } from '../services/api';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryCreated: (categoryId: string) => void;
}

export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ isOpen, onClose, onCategoryCreated }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('O nome da categoria é obrigatório.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newCat = await api.createCategory(name.trim());
      const newId = newCat.id?.toString() || newCat.data?.id?.toString() || newCat[0]?.id?.toString() || '';
      
      setName('');
      onCategoryCreated(newId);
    } catch (err: any) {
      setError(err.message || 'Erro ao criar categoria.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Nova Categoria</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            {error && (
              <div className={styles.errorBox}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome da Categoria</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Ex: Bebidas, Sobremesas..."
                autoFocus
                required
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
