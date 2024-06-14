'use client';
import {FC} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {setValue} from '@/redux/features/modalAuth';
import Image from 'next/image';

const ModalAuth: FC = () => {
  const {active, description, title} = useAppSelector(state => state.modalAuth);
  const dispatch = useAppDispatch();

  return (
    <section className={`absolute w-full top-0 right-0 overflow-hidden`}>
      <AnimatePresence>
        {active && (
          <motion.div
            key={'gradient-shadow'}
            initial={{opacity: 0, clipPath: 'circle(0 at 50% 0%)'}}
            animate={{opacity: 1, clipPath: 'circle(120% at 50% 0%)'}}
            exit={{opacity: 0}}
            className="backing absolute h-full w-full backing-gradient"
          ></motion.div>
        )}
        {active && (
          <motion.div
            key={'card'}
            initial={{opacity: 0, y: '50%'}}
            animate={{opacity: 1, y: '20%'}}
            exit={{opacity: 0, y: '50%'}}
            className="backing absolute h-full w-full flex h-screen flex-col relative px-10 items-center"
          >
            <div className="max-w-lg w-full p-9 bg-white rounded-xl drop-shadow-2xl">
              <div className="w-full text-center pb-4">
                <Image
                  src={'/img/email-picture.png'}
                  height={50}
                  width={50}
                  alt="Email icon"
                  className="mx-auto"
                />
              </div>
              <div className="pb-6 w-full min-w-lg text-center">
                <h2 className="font-bold pb-4">{title}</h2>
                <p className="font-light">{description}</p>
              </div>
              <div className="w-full text-center">
                <button
                  onClick={() => dispatch(setValue({active: !active}))}
                  className="p-4 bg-blue-400 rounded-lg w-8/12 font-bold text-white"
                >
                  Continuar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ModalAuth;
