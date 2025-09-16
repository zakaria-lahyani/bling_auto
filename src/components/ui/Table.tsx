import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  showFooter?: boolean;
  footerContent?: ReactNode;
  emptyMessage?: string;
}

function Table<T extends Record<string, any>>({
  data,
  columns,
  className,
  showFooter = false,
  footerContent,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {columns.map((column, index) => (
              <th
                key={String(column.key) || index}
                className={clsx(
                  'py-3 px-4 font-medium text-slate-600 dark:text-slate-300',
                  {
                    'text-left': column.align === 'left' || !column.align,
                    'text-center': column.align === 'center',
                    'text-right': column.align === 'right',
                  }
                )}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={String(column.key) || colIndex}
                  className={clsx(
                    'py-3 px-4',
                    {
                      'text-left': column.align === 'left' || !column.align,
                      'text-center': column.align === 'center',
                      'text-right': column.align === 'right',
                    }
                  )}
                >
                  {column.render
                    ? column.render(item, rowIndex)
                    : String(item[column.key] || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {showFooter && footerContent && (
          <tfoot>
            <tr className="border-t-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
              {footerContent}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default Table;