import React, { useState } from 'react';
import { Upload, Loader2, X, AlertCircle } from 'lucide-react';
import styles from './css/CreateItemModal.module.css';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { CustomSelect, type SelectOption } from './CustomSelect';
import { CreateCategoryModal } from './CreateCategoryModal';

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemCreated: () => void;
}

export const CreateItemModal: React.FC<CreateItemModalProps> = ({ isOpen, onClose, onItemCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { data: categories, isLoading: isLoadingCategories, refetch: refetchCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: api.fetchCategories
  });

  if (!isOpen) return null;

  const categoryOptions: SelectOption[] = categories ? categories.map((cat: any) => ({
    value: cat.id.toString(),
    label: cat.name
  })) : [];
  
  categoryOptions.push({
    value: 'NEW',
    label: '+ Nova Categoria',
    isSpecial: true
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !price || !categoryId) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (description) formData.append('description', description);
      formData.append('price', price);
      formData.append('categoryId', categoryId);
      if (photo) {
        formData.append('photo', photo);
      }

      const response = await api.postFormData('/items', formData);
      
      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || 'Falha ao criar item');
      }
      
      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setPhoto(null);
      setPhotoPreview(null);
      
      onItemCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao criar o item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Novo Item</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className={styles.modalBody}>
            {error && (
              <div className={styles.generalError}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
            
            <div className={styles.formGroup}>
              <div className={styles.fileInputWrapper}>
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className={styles.previewImage} />
                ) : (
                  <>
                    <Upload className={styles.uploadIcon} />
                    <span className={styles.uploadText}>Enviar foto do prato</span>
                    <span className={styles.uploadSubText}>PNG, JPG ou WEBP (Max. 5MB)</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoChange} 
                  className={styles.fileInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Nome do Item</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Ex: Hambúrguer Clássico"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Preço (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={styles.input}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Categoria</label>
                <CustomSelect 
                  value={categoryId}
                  onChange={(val) => {
                    if (val === 'NEW') {
                      setIsCategoryModalOpen(true);
                    } else {
                      setCategoryId(val);
                    }
                  }}
                  options={categoryOptions}
                  placeholder={isLoadingCategories ? "Carregando..." : "Selecione..."}
                  disabled={isLoadingCategories}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descrição</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
                placeholder="Ingredientes e detalhes para o cliente..."
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Salvando...
                </>
              ) : (
                'Salvar Item'
              )}
            </button>
          </div>
        </form>
      </div>

      <CreateCategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)} 
        onCategoryCreated={async (newId) => {
          await refetchCategories();
          setCategoryId(newId);
          setIsCategoryModalOpen(false);
        }} 
      />
    </div>
  );
};
