'use client';
import {Client, Provider, cacheExchange, fetchExchange} from 'urql';

const GRAPHQL_ENDPOINT: string = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!;

const client = new Client({
  url: GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
});

const WrapperGraphQl = ({children}) => {
  return <Provider value={client}>{children}</Provider>;
};

export default WrapperGraphQl;
