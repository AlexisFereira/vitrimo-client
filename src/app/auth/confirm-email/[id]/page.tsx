import {CONFIRM_EMAIL} from '@/graphql-queries/auth';
import {FC} from 'react';
import {withUrqlClient, initUrqlClient} from 'next-urql';
import {cacheExchange, fetchExchange, dedupExchange, ssrExchange} from 'urql';
import useSWR from 'swr';

type Props = {
  params: Record<string, any>;
};
const fetcher = async (id: string) => {
  const ssrCache = ssrExchange({isClient: false});
  const client = initUrqlClient(
    {
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );
  await client.mutation(CONFIRM_EMAIL, {userId: id}).toPromise();
  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
};

const ConfirmEmailPage: FC<Props> = async ({params}) => {
  const {data, error} = useSWR(fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="w-full pb-4">
        <h1 className="text-2xl font-bold pb-4">
          ¡Gracias por confirmar tu cuenta de correo electrónico!
        </h1>
        <p className="font-light pb-4">
          Nos complace saber que has tomado la medida necesaria para asegurarte
          de que tu información está segura con nosotros. Sabemos lo importante
          que es la privacidad y por eso valoramos tu confianza en nosotros.
          <br />
          <br /> Al confirmar tu cuenta de correo electrónico, estás activando
          tu membresía y puedes tener acceso a nuestro catálogo completo de
          productos y servicios. Nuestro equipo se esfuerza por brindarte la
          mejor experiencia de usuario, y estamos seguros de que encontrarás
          todo lo que necesitas aquí en nuestra página.
        </p>
        <button className="p-3 rounded bg-blue-500 font-bold text-white w-6/12">
          Crear catalogo
        </button>
      </div>
    </div>
  );
};

export default withUrqlClient(
  () => ({
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
    url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
  }),
  {ssr: true}
)(ConfirmEmailPage);
