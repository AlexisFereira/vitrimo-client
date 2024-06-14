import {FC} from 'react';

type Props = {
  text: string;
};

const FormHeader: FC<Props> = ({text}) => {
  return (
    <div className="w-full">
      <h1 className="font-bold text-4xl pb-4">¡Hola! 👋</h1>
      <p className="pb-4 font-light text-gray-600">{text}</p>
    </div>
  );
};

export default FormHeader;
