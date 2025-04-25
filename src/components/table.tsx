import { ActionType, ProFormInstance, ProTable, ProTableProps } from '@ant-design/pro-components';
import { useCallback, useEffect, useRef } from 'react';

type Search<R> = {
  [P in keyof R]: R[P];
} & {
  sort: 'descend' | 'ascend';
  current: number;
  pageSize: number;
}

type FetchFn<R> = (search: Search<R>) => Promise<{
  data: R[];
  total: number;
}>;

type TableProps<R> = {
  onFetch: ReturnType<typeof useFetch<R>>;
  columns: ProTableProps<R, 'text'>['columns'];
  table?: ReturnType<typeof useTable>;
} & Omit<ProTableProps<R, 'text'>,
  'request' | 'formRef' | 'actionRef' | 'onRequestError' | 'params'
>;


export default function Table<R extends {}>(props: TableProps<R>) {

  const {
    onFetch,
    columns,
    table,
    ...rest
  } = props;

  const search = useRef<ProFormInstance | null>(null);
  const aciton = useRef<ActionType | null>(null);

  useEffect(() => {
    aciton.current?.reload();
  }, [onFetch]);

  useEffect(() => {
    if (table) {
      Object.assign(
        table,
        {
          search: search.current,
          action: aciton.current,
        }
      )
    }
  }, [table]);

  return (
    <ProTable
      {...rest}
      formRef={search}
      actionRef={aciton}
      request={onFetch}
      columns={columns}
      className="ask-drink-table-box"
      tableViewRender={(...[, table]) => {
        return table;
      }}
    />
  )
};

const useFetch = function <R>(
  fn: FetchFn<R>,
  deep: React.DependencyList = []
) {
  const take = useCallback(fn, deep);
  return take;
};

type SearchFn<R> = {
  search?: ProFormInstance<R>;
  action?: ActionType;
}

const useTable = function <R>() {
  const table = useRef<SearchFn<R>>({});
  return table.current;
}

Table.useFetch = useFetch;
Table.useTable = useTable;