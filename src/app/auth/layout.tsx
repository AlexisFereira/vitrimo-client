import ModalAuth from './components/modal';

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex items-stretch w-full h-full">
      <section className="flex flex-col justify-center w-1/2 p-7">
        <div className="max-w-xl rounded-lg mx-auto p-10">
          <h1 className="pb-6 font-bold text-5xl">
            ‣Llegar a más clientes y{' '}
            <span className="text-green-500">aumentar tus ventas</span>
          </h1>
          <p>
            Regístrate en nuestro catálogo y obtén todas las herramientas que
            necesitas para hacer crecer tu negocio.
            <br />
            <br />
            ¡No esperes más y únete a nuestra plataforma de ventas en línea hoy
            mismo!
          </p>
        </div>
      </section>
      <section className="flex bg-slate-50 flex-col justify-center w-1/2 p-7 relative">
        {children}
        <ModalAuth />
      </section>
    </div>
  );
}
