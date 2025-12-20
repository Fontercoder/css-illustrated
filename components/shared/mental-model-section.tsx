"use client";

export interface MentalModelSectionProps {
  title: string;
  description: string;
  features: string[];
  layerAssignment: string;
  browserBehavior?: string;
}

export function MentalModelSection({
  title,
  description,
  features,
  layerAssignment,
  browserBehavior,
}: MentalModelSectionProps) {
  return (
    <section className="mb-6 border border-border rounded-lg p-4 bg-card/30">
      <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground space-y-2">
        <p><strong>{description}</strong></p>
        {features.length > 0 && (
          <ul className="list-disc list-inside space-y-1 ml-4">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
        {layerAssignment && (
          <p className="mt-3"><strong>Layer Assignment:</strong> {layerAssignment}</p>
        )}
        {browserBehavior && (
          <div className="text-xs bg-card/30 p-2 rounded mt-3">
            <strong>Browser behavior:</strong> {browserBehavior}
          </div>
        )}
      </div>
    </section>
  );
}