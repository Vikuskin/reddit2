import { LOCALES } from '../Translate/locales';
import { FormattedMessage } from 'react-intl';
import { useContext } from 'react';
import { Context } from '../Functions/Context';

export const LanguagesSelect = () => {
  const {
    currentLocale,
    handleChange
  } = useContext(Context);
  const languages = [
    { name: 'English', code: LOCALES.ENGLISH },
    { name: 'Русский', code: LOCALES.RUSSIAN }
  ]
  return (
    <div>
      <FormattedMessage id="language"/> 
      <select className="d-block col-12 p-2 text-center" style={{ border: 'none', borderRadius: '5px', backgroundColor: '#f5f2f2' }} onChange={handleChange} value={currentLocale}>
        {languages.map(({ name, code, index }) => (
          <option eventkey={index} key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
