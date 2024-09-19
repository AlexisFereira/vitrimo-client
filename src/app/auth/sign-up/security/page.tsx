'use client';
import Input from '@/app/components/Input';
import {useRouter} from 'next/navigation';
import {setValue, reset} from '@/redux/features/auth';
import {setValue as handlerModal} from '@/redux/features/modalAuth';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {thirdStepSchema} from '../../validations';
import {useEffect, useRef} from 'react';
import {Formik} from 'formik';
import Link from 'next/link';

export default function Contact() {
  const router = useRouter();
  const {password, confirmPassword} = useAppSelector(state => state.signup);
  const dispatch = useAppDispatch();
  const formRef = useRef(null);
  const modalData = {
    title: '¡Estas a un paso de crear tu cuenta!',
    description:
      'Te hemos enviado un correo electrónico de confirmación. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para activar tu cuenta.',
  };
  const triggerSubmit = () => {
    if (formRef.current) {
      if (
        typeof (formRef.current as HTMLFormElement).requestSubmit === 'function'
      ) {
        (formRef.current as HTMLFormElement).requestSubmit();
      } else {
        (formRef.current as HTMLFormElement).dispatchEvent(
          new Event('submit', {cancelable: true})
        );
      }
    }
  };
  const initValues = useRef<Record<string, any>>({
    password,
    confirmPassword,
  });

  useEffect(() => {
    dispatch(setValue({currentStep: 3}));
  });

  return (
    <>
      <Formik
        initialValues={initValues.current}
        validationSchema={thirdStepSchema}
        enableReinitialize={true}
        onSubmit={(values, {resetForm}) => {
          dispatch(reset());
          dispatch(handlerModal({active: true, ...modalData}));
          resetForm();
          router.push('/auth/sign-up');
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form ref={formRef} onSubmit={handleSubmit}>
            <Input
              type="password"
              name="password"
              value={values.password}
              handlerChange={handleChange as () => void}
              onBlur={handleBlur as () => void}
              error={((touched.password && errors.password) as string) || ''}
              label="Nueva Contraseña"
            />
            <Input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              handlerChange={handleChange as () => void}
              onBlur={handleBlur as () => void}
              error={
                ((touched.confirmPassword &&
                  errors.confirmPassword) as string) || ''
              }
              label="Repita contraseña"
            />
          </form>
        )}
      </Formik>
      <div className="flex items-center justify-between pt-3 w-full">
        <Link
          href={'/auth/sign-up/contact'}
          className="btn-link p-4 border-2 border-blue-400 rounded-lg font-bold text-blue-400"
        >
          Atrás
        </Link>
        <button
          onClick={triggerSubmit}
          type="button"
          className="p-4 bg-blue-400 rounded-lg font-bold text-white"
        >
          Continuar
        </button>
      </div>
    </>
  );
}
