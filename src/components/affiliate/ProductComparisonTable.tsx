interface ProductComparisonTableProps {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export function ProductComparisonTable({
  caption,
  headers,
  rows,
}: ProductComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto border border-border-subtle bg-white">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        {caption ? (
          <caption className="border-b border-border-subtle bg-ivory-soft px-5 py-3 text-left font-serif text-base text-dark-ink">
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr className="border-b border-border-subtle bg-ivory-soft/70">
            {headers.map((header, idx) => (
              <th
                key={`${header}-${idx}`}
                scope="col"
                className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-brown"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="transition-colors hover:bg-ivory-soft/50"
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={`px-5 py-3.5 text-dark-ink/85 ${
                    cellIdx === 0 ? "font-medium text-dark-ink" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

