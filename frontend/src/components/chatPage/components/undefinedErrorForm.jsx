import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import errorImage from '../../../assets/unknown.svg';

const UndefinedErrorForm = () => {
  const { t } = useTranslation();
  const handleRefresh = () => window.location.reload();

  return (
    <div className="text-center">
      <img
        alt={t('dataLoadFail')}
        className="img-fluid h-25"
        src={errorImage}
      />
      <h1 className="h4 text-muted">{t('dataLoadFail')}</h1>
      <p className="text-muted">
        {t('refreshMsg1')}
        {' '}
        <Link to="/" onClick={handleRefresh}>
          {t('refreshMsg2')}
        </Link>
      </p>
    </div>
  );
};

export default UndefinedErrorForm;
