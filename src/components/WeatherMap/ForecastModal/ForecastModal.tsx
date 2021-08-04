import React from 'react';
import style from './ForecastModal.module.css';
import { ForecastModalP } from '../../../types/component-types/component-types';
import ForecastGraphTest from './ForecastGraph/ForecastGraphTest';

const ForecastModal = ({ setForecast }: ForecastModalP) => {
  return (
    <div className={style.modal}>
        <ForecastGraphTest />
      <div onClick={() => setForecast(false)} className={style.modalCloser} />
    </div>
  );
};

export default ForecastModal;
