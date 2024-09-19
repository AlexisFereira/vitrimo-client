import * as Yup from 'yup';

export const firstStepSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Ingrese mínimo 3 caracteres.')
    .max(50, 'Too Long!')
    .required('Campo requerido.'),
  lastName: Yup.string()
    .min(3, 'Ingrese mínimo 3 caracteres.')
    .max(50, 'Too Long!')
    .required('Campo requerido.'),
  nameCommerce: Yup.string()
    .min(3, 'Ingrese mínimo 3 caracteres.')
    .required('Campo requerido.'),
  typeCommerce: Yup.string().max(50, 'Too Long!').required('Campo requerido.'),
});

export const secondStepSchema = Yup.object().shape({
  phone: Yup.number()
    .min(10, 'Ingrese mínimo 3 caracteres.')
    .required('Campo requerido'),
  email: Yup.string()
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Correno no valido. Debe ingresar un correo valido ej: test@domain.com'
    )
    .required('Campo requerido.'),
});

export const thirdStepSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'La contraseña debe tener minimo 8 caracteres entre mayusculas, numeros y minusculas.'
    )
    .required('Campo requerido.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben consincidir.')
    .required('Campo requerido.'),
});

export const logInSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Por favor, ingresa una dirección de correo electrónico válida. Asegúrate de incluir "@" y el dominio correspondiente.'
    )
    .required('Campo requerido.'),
  password: Yup.string()
    .min(3, 'Ingrese mínimo 3 caracteres.')
    .max(50, 'Too Long!')
    .required('Campo requerido.'),
});

export const emailSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Por favor, ingresa una dirección de correo electrónico válida. Asegúrate de incluir "@" y el dominio correspondiente.'
    )
    .required('Campo requerido.'),
});
