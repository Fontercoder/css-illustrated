"use client";

export interface ComparisonTableProps {
  title: string;
  columns: string[];
  rows: Array<{
    feature: string;
    values: string[];
  }>;
  variant?: 'default' | 'compact';
}

export function ComparisonTable({
  title,
  columns,
  rows,
  variant = 'default',
}: ComparisonTableProps) {
  const tableClasses = variant === 'compact' 
    ? "text-xs" 
    : "text-sm";

  return (
    <section className="mb-6 border border-border rounded-lg p-4 bg-card/30">
      <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className={`w-full text-left border-collapse ${tableClasses}`}>
          <thead>
            <tr className="bg-card/50">
              {columns.map((column, index) => (
                <th key={index} className="border px-4 py-2">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border px-4 py-2">{row.feature}</td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex} className="border px-4 py-2">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}