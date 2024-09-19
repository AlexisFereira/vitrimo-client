'use client';

import {FC} from 'react';
import {useAppSelector} from '@/redux/hooks';

const TitleSteps: FC = () => {
  const {currentStep} = useAppSelector(state => state.signup);
  const stepPills: Record<number, string> = {
    1: 'Información básica',
    2: 'Información de contacto',
    3: 'Seguridad',
  };
  const cssBase = 'py-1 bg-gray-400 rounded-lg';
  const cssActive = 'px-4 bg-rose-500';
  const classNames = {
    1: `${cssBase} ${currentStep === 1 ? cssActive : 'px-3'}`,
    2: `${cssBase} ${currentStep === 2 ? cssActive : 'px-3'} mx-2`,
    3: `${cssBase} ${currentStep === 3 ? cssActive : 'px-3'}`,
  };

  return (
    <div className="text-center pb-4">
      <p className="font-bold text-xl pb-3">{stepPills[currentStep]}</p>
      <div className="flex justify-center">
        <div className={classNames[1]}></div>
        <div className={classNames[2]}></div>
        <div className={classNames[3]}></div>
      </div>
    </div>
  );
};

export default TitleSteps;
