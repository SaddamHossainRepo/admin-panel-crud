import {
    Author,
    CreateAuthorInput,
    AuthorQueryOptions,
    AuthorPaginator,
    QueryOptions,
    Product,
  } from '@/types';
  import { API_ENDPOINTS } from './api-endpoints';
  import { crudFactory } from './curd-factory';
  import { HttpClient } from './http-client';
  
  export const ProductClient = {
    ...crudFactory<Product, QueryOptions, CreateAuthorInput>(
      API_ENDPOINTS.AUTHORS
    ),
    paginated: ({
      type,
      name,
      is_approved,
      ...params
    }: Partial<AuthorQueryOptions>) => {
      return HttpClient.get<AuthorPaginator>(API_ENDPOINTS.AUTHORS, {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({ type, name, is_approved }),
      });
    },
  };
  