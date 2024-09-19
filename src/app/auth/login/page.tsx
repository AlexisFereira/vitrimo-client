'use client';
import Input from '@/app/components/Input';
import {useRouter} from 'next/navigation';
import {setValue} from '@/redux/features/auth';
import {useAppDispatch} from '@/redux/hooks';
import {FC, useRef} from 'react';
import {Formik} from 'formik';
import Link from 'next/link';
import FormHeader from '../components/formHeader';
import {logInSchema} from '../validations';

const LoginPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const formRef = useRef(null);
  const headerText =
    'Inicia sesión para explorar todas las características de nuestra plataforma.';
  const initValues = useRef({
    username: '',
    password: '',
  });

  return (
    <div className="max-w-md mx-auto w-full">
      <FormHeader text={headerText} />
      <Formik
        initialValues={initValues.current}
        validationSchema={logInSchema}
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={values => {
          dispatch(setValue(values));
          router.push('/auth/sign-up/security');
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
              label="Correo electrónico"
              name="username"
              value={values.username}
              handlerChange={handleChange as () => void}
              error={(touched.username && errors.username) || ''}
              onBlur={handleBlur as () => void}
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={values.password}
              handlerChange={handleChange as () => void}
              error={(touched.password && errors.password) || ''}
              onBlur={handleBlur as () => void}
            />
            <div className="w-full">
              <div className="flex w-full justify-between pb-4">
                <div className="flex">Recordarme</div>
                <Link href={'/auth/recover-pass'}>
                  <span className="font-bold text-blue-400">
                    ¿Olvidaste tu contraseña?
                  </span>
                </Link>
              </div>

              <div className="pt-4 w-full">
                <button className="w-full bg-blue-400 p-4 rounded-lg font-bold text-white">
                  Iniciar sesión
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <div className="w-full text-center pt-10">
        <p>
          ¿Aun no tienes una cuenta?
          <Link href={'/auth/sign-up'}>
            <span className="font-bold text-blue-400 px-3">Crear cuenta</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
