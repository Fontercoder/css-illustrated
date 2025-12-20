"use client";

export interface CommonMistake {
  title: string;
  reason: string;
  example: string;
  level?: 'critical' | 'warning' | 'info';
}

export interface CommonMistakesSectionProps {
  title?: string;
  mistakes: CommonMistake[];
  variant?: 'default' | 'compact';
}

export function CommonMistakesSection({
  title = "❌ Common Mistakes & Why They Happen",
  mistakes,
  variant = 'default',
}: CommonMistakesSectionProps) {
  const sectionClasses = variant === 'compact'
    ? "border border-red-200 dark:border-red-800 rounded-lg p-3 bg-red-50/30 dark:bg-red-900/10 space-y-2"
    : "space-y-4 border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50/30 dark:bg-red-900/10";

  const titleClasses = variant === 'compact'
    ? "text-lg font-semibold text-red-700 dark:text-red-400"
    : "text-xl font-semibold text-red-700 dark:text-red-400";

  const mistakeCardClasses = variant === 'compact'
    ? "p-2 bg-white/50 dark:bg-black/20 rounded border border-red-200 dark:border-red-800"
    : "p-3 bg-white/50 dark:bg-black/20 rounded border border-red-200 dark:border-red-800";

  const textSize = variant === 'compact' ? 'text-xs' : 'text-sm';

  return (
    <section className={sectionClasses}>
      <h2 className={titleClasses}>{title}</h2>
      <div className={`space-y-3 ${textSize}`}>
        {mistakes.map((mistake, index) => (
          <div key={index} className={mistakeCardClasses}>
            <p className={`font-medium text-red-700 dark:text-red-400 ${variant === 'compact' ? 'text-sm' : ''}`}>
              ❌ {mistake.title}
            </p>
            <p className="text-muted-foreground">{mistake.reason}</p>
            <code className={`bg-muted px-2 py-1 rounded mt-2 block ${variant === 'compact' ? 'text-xs' : 'text-xs'}`}>
              {mistake.example}
            </code>
          </div>
        ))}
      </div>
    </section>
  );
}