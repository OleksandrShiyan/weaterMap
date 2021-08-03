import React from 'react';
import style from './ForecastModal.module.css';
import { ForecastModalP } from '../../../types/component-types/component-types';
import ForecastGraphTest from './ForecastGraph/ForecastGraphTest';

const ForecastModal = ({ setForecast }: ForecastModalP) => {
  const closeModal = () => {
    setForecast(false);
  };

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <ForecastGraphTest />
      </div>
      <div onClick={closeModal} className={style.modalCloser} />
    </div>
  );
};

export default ForecastModal;
