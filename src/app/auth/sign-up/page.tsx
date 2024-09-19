'use client';

import {setValue} from '@/redux/features/auth';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Formik} from 'formik';
import {firstStepSchema} from '../validations';
import {FC, useEffect, useRef} from 'react';
import Input from '@/app/components/Input';
import Link from 'next/link';
import commerceList from './typesCommerceList';
import {useRouter} from 'next/navigation';

const SignUpPage: FC = () => {
  const {name, lastName, nameCommerce, typeCommerce} = useAppSelector(
    state => state.signup
  );

  const router = useRouter();
  const dispatch = useAppDispatch();

  const initValues = useRef({
    name,
    lastName,
    nameCommerce,
    typeCommerce,
  });

  const formRef = useRef(null);
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

  useEffect(() => {
    dispatch(setValue({currentStep: 1}));
  });

  return (
    <>
      <section className="w-full">
        <Formik
          initialValues={initValues.current}
          validationSchema={firstStepSchema}
          enableReinitialize={true}
          onSubmit={values => {
            dispatch(setValue(values));
            router.push('/auth/sign-up/contact');
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
            <form onSubmit={handleSubmit} ref={formRef}>
              <Input
                label="Nombre"
                name={'name'}
                value={values.name}
                handlerChange={handleChange as () => void}
                error={(touched.name && errors.name) || ''}
                onBlur={handleBlur as () => void}
              />
              <Input
                label="Apellido"
                name={'lastName'}
                value={values.lastName}
                handlerChange={handleChange as () => void}
                error={(touched.lastName && errors.lastName) || ''}
                onBlur={handleBlur as () => void}
              />
              <Input
                label="Nombre del negocio"
                name={'nameCommerce'}
                value={values.nameCommerce}
                handlerChange={handleChange as () => void}
                error={(touched.nameCommerce && errors.nameCommerce) || ''}
                onBlur={handleBlur as () => void}
              />
              <Input
                label="Tipo del negocio"
                name={'typeCommerce'}
                value={values.typeCommerce}
                handlerChange={handleChange as () => void}
                error={(touched.typeCommerce && errors.typeCommerce) || ''}
                onBlur={handleBlur as () => void}
                options={commerceList}
              />
            </form>
          )}
        </Formik>
        <div className="flex items-center pt-3">
          <div className="flex-auto">
            <p>
              ¿Ya tienes una cuenta?{' '}
              <Link href={'/auth/login'}>
                <span className="font-bold text-blue-400 px-3">
                  Iniciar sesión
                </span>
              </Link>
            </p>
          </div>
          <button
            type="button"
            onClick={triggerSubmit}
            className="p-4 bg-blue-400 rounded-lg font-bold text-white"
          >
            Continuar
          </button>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
