import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//Mui 커스텀 스타일드 컴포넌트
export const ValidationTextField = styled(TextField)({
  width: '100%',
});

export const ColorButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  width: '50%',
  height: '50px',

  fontWeight: 800,
  fontSize: '26px',
  borderColor: '#1e1e1e',
  borderRadius: '15px',

  color: '#1e1e1e',
}));
