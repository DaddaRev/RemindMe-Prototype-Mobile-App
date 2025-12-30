import { useTranslation } from 'react-i18next';

// Custom hook per tradurre gli enum del database (modalities e descriptions)

export const useEnumTranslation = () => {
  const { t } = useTranslation();


  const translateModality = (modality) => {
    const key = `enums.modalities.${modality}`;
    const translated = t(key);
    // Se la chiave non esiste, i18next ritorna la chiave stessa
    return translated !== key ? translated : modality;
  };

  const translateDescription = (description) => {
    if (!description) return '';
    
    const key = `enums.medicineDescriptions.${description}`;
    const translated = t(key);
    
    // Se la chiave non esiste nel file di traduzione, i18next ritorna la chiave stessa
    // In questo caso, restituiamo la stringa libera dell'utente
    if (translated === key) {
      return description;
    }
    
    return translated; // È una chiave predefinita, ritorna la traduzione
  };

  return { 
    translateModality, 
    translateDescription
  };
};
