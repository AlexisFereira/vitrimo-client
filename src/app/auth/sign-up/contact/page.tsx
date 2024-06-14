'use client';
import Input from '@/app/components/Input';
import {useRouter} from 'next/navigation';
import {setValue} from '@/redux/features/auth';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {secondStepSchema} from '../../validations';
import {useEffect, useRef} from 'react';
import {Formik} from 'formik';

export default function Contact() {
  const router = useRouter();
  const {phone, email} = useAppSelector(state => state.signup);
  const dispatch = useAppDispatch();
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
  const initValues = useRef<Record<string, any>>({
    phone,
    email,
  });

  useEffect(() => {
    dispatch(setValue({currentStep: 2}));
  });

  return (
    <>
      <Formik
        initialValues={initValues.current}
        validationSchema={secondStepSchema}
        enableReinitialize={true}
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
              label="Teléfono"
              name={'phone'}
              type="tel"
              value={values.phone}
              handlerChange={handleChange as () => void}
              onBlur={handleBlur as () => void}
              error={(touched.phone && errors.phone) as string}
            />

            <Input
              label="Correo electrónico"
              name={'email'}
              value={values.email}
              handlerChange={handleChange as () => void}
              onBlur={handleBlur as () => void}
              error={(touched.email && errors.email) as string}
            />
          </form>
        )}
      </Formik>
      <div className="flex items-center justify-between pt-3 w-full">
        <button
          onClick={() => router.push('/auth/sign-up')}
          className="btn-link p-4 border-2 border-blue-400 rounded-lg font-bold text-blue-400"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={triggerSubmit}
          className="p-4 bg-blue-400 rounded-lg font-bold text-white"
        >
          Continuar
        </button>
      </div>
    </>
  );
}
