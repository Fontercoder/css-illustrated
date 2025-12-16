import React from "react";
import CopyButton from "./copybutton";


type ExampleCardProps = {
  title: string;
  code: string;
  description: string;
  children: React.ReactNode; // preview content
};

function ExampleCard({
  title,
  code,
  description,
  children,
}: ExampleCardProps) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card/20">
      <h3 className="font-semibold mb-3">{title}</h3>

      <div className="border border-border rounded p-3 mb-3">
        {children}
      </div>

      <div className="relative border border-border rounded-md bg-muted p-3">
        <div className="absolute right-3 top-3">
          <CopyButton text={code} />
        </div>

        <pre className="overflow-x-auto text-sm">
          <code>{code}</code>
        </pre>
      </div>

      <p className="text-sm text-muted-foreground mt-2">
        {description}
      </p>
    </div>
  );
}

export default ExampleCard;
