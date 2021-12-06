import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export const ChangeTheme = ({ theme, themeToggler }) => {
  return (
    <Button onClick={themeToggler} className="col-12 d-block" style={{ color: 'black', border: 'none' }}>
      <FormattedMessage id="change_theme"/>
    </Button>
  );
};