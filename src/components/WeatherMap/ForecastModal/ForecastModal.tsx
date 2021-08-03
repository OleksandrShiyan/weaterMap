import React from 'react';
import style from './ForecastModal.module.css'
import { ForecastModalP } from '../../../types/component-types/component-types';
import ForecastGraph from "./ForecastGraph/ForecastGraph";
import ForecastGraphTest from "./ForecastGraph/ForecastGraphTest";

const ForecastModal = ({setForecast}: ForecastModalP) => {

    const closeModal = () => {
        setForecast(false);
    }
    // console.log('height inner: ', window.innerHeight, ' width inner: ', window.innerWidth)
    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                {/*<ForecastGraph/>*/}
                <ForecastGraphTest/>
            </div>
            <div onClick={closeModal} className={style.modalCloser}/>
        </div>
    );
};

export default ForecastModal;