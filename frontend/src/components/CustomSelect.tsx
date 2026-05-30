import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './css/CustomSelect.module.css';

export interface SelectOption {
  value: string;
  label: string;
  isSpecial?: boolean;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Selecione...',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer} ref={containerRef}>
      <div 
        className={`${styles.selectTrigger} ${isOpen ? styles.isOpen : ''} ${disabled ? styles.isDisabled : ''}`}
        onClick={handleToggle}
      >
        <span className={!selectedOption ? styles.placeholder : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`${styles.chevron} ${isOpen ? styles.isOpen : ''}`} />
      </div>

      {isOpen && !disabled && (
        <div className={styles.dropdownMenu}>
          {options.length === 0 ? (
            <div className={styles.option} style={{ color: '#8e8e93', cursor: 'default' }}>
              Nenhuma opção disponível
            </div>
          ) : (
            options.map((option) => (
              <div 
                key={option.value}
                className={`
                  ${styles.option} 
                  ${value === option.value ? styles.isSelected : ''} 
                  ${option.isSpecial ? styles.specialOption : ''}
                `}
                onClick={() => handleSelect(option.value)}
              >
                <span>{option.label}</span>
                {value === option.value && !option.isSpecial && <Check size={16} color="#6366f1" />}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
