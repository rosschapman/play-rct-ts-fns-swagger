import React from "react";

export function OperationViewerLayout(props: {
  activePath: RT.ActivePath;
  children: React.ReactNode;
}) {
  const activePath = props.activePath;
  const title = `${activePath!.path} -> ${activePath!.name}`;

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <div>{props.children}</div>
    </>
  );
}
