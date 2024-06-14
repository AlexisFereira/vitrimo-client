'use client';
import Input from '@/app/components/Input';
import {useRouter} from 'next/navigation';
import {setValue} from '@/redux/features/auth';
import {setValue as handlerModal} from '@/redux/features/modalAuth';
import {useAppDispatch} from '@/redux/hooks';
import {FC, useRef} from 'react';
import {Formik} from 'formik';
import Link from 'next/link';
import {emailSchema} from '../validations';

const RecoverPassPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const modalTitle = '¡Ya casi recuperas tu contraseña!';
  const modalDescription =
    'Hemos enviado un mensaje a tu correo electrónico para para recuperar contraseña.';

  const initValues = useRef({
    username: '',
  });

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="w-full pb-4">
        <h1 className="font-bold pb-4">
          Recupera tu contraseña en solo unos pasos
        </h1>
        <p className="font-light">
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </p>
      </div>
      <Formik
        initialValues={initValues.current}
        validationSchema={emailSchema}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, {resetForm}) => {
          dispatch(setValue(values));
          dispatch(
            handlerModal({
              active: true,
              title: modalTitle,
              description: modalDescription,
            })
          );
          resetForm();
          router.push('/auth/login');
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
          <form onSubmit={handleSubmit}>
            <Input
              label="Correo electrónico"
              name="username"
              value={values.username}
              handlerChange={handleChange as () => void}
              error={(touched.username && errors.username) || ''}
              onBlur={handleBlur as () => void}
            />
            <div className="pt-4 w-full flex justify-between items-center ">
              <div className="col-auto">
                <Link href={'/auth/login'}>
                  <span className="font-bold text-blue-400">Volver</span>
                </Link>
              </div>
              <button className="bg-blue-400 p-4 rounded-lg font-bold text-white">
                Enviar
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RecoverPassPage;
