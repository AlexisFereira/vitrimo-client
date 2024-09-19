'use client';
import Input from '@/app/components/Input';
import {useRouter} from 'next/navigation';
import {FC, useRef} from 'react';
import {Formik} from 'formik';
import {thirdStepSchema} from '../../validations';

type Props = {
  params: Record<string, any>;
};

const ResetPasswordPage: FC<Props> = ({params}) => {
  const router = useRouter();
  const initValues = useRef({
    password: '',
    confirmPassword: '',
  });

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="w-full pb-4">
        <h1 className="font-bold pb-4">Cree su nueva contraseña</h1>
        <p className="font-light">
          En poco tendrás una nueva contraseña y podrás volver a acceder a tu
          cuenta.
        </p>
      </div>
      <Formik
        initialValues={initValues.current}
        validationSchema={thirdStepSchema}
        enableReinitialize={true}
        validateOnChange={false}
        onSubmit={values => {
          console.log(values);
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
              label="Nueva contraseña"
              name="password"
              type="password"
              value={values.password}
              handlerChange={handleChange as () => void}
              error={(touched.password && errors.password) || ''}
              onBlur={handleBlur as () => void}
            />
            <Input
              label="Confirme contraseña"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              handlerChange={handleChange as () => void}
              error={(touched.confirmPassword && errors.confirmPassword) || ''}
              onBlur={handleBlur as () => void}
            />
            <div className="pt-4 w-full flex justify-between items-center ">
              <button className="bg-blue-400 p-4 rounded-lg font-bold text-white w-full">
                Crear contraseña
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordPage;
