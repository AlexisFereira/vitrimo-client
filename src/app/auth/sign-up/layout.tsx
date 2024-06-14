import TitleSteps from './titleSteps';
import FormHeader from '../components/formHeader';

export default function SignUpLayout({children}: {children: React.ReactNode}) {
  const headerFormText =
    'Estamos encantados de que estés aquí. Por favor, sigue los siguientes pasos para crear tu cuenta.';

  return (
    <div className="max-w-md mx-auto">
      <FormHeader text={headerFormText} />
      <TitleSteps />
      {children}
    </div>
  );
}
