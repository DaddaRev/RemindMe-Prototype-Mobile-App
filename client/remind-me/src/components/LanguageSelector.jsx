import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Optional: save to localStorage to persist user's preference
    localStorage.setItem('language', lng);
  };

  // On component mount, check if there's a saved language preference
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const currentLanguageLabel = i18n.language === 'it' 
    ? t('common.italian') 
    : t('common.english');

  return (
    <Dropdown>
      <Dropdown.Toggle 
        variant="outline-secondary" 
        size="sm" 
        id="language-dropdown"
        style={{ 
          fontSize: '0.9rem',
          padding: '0.25rem 0.5rem'
        }}
      >
        {currentLanguageLabel}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item 
          onClick={() => changeLanguage('en')}
          active={i18n.language === 'en'}
        >
          {t('common.english')}
        </Dropdown.Item>
        <Dropdown.Item 
          onClick={() => changeLanguage('it')}
          active={i18n.language === 'it'}
        >
          {t('common.italian')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;