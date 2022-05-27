import { useNavigate } from 'react-router-dom';

export const pathRouters = () => {
  const navigate = useNavigate();
  return {
    setPath: value => navigate(`/leader/${value}`),
    setPathBack: () => {
      navigate(-1);
    },
  };
};
