import React from "react";
import { Spec } from "swagger-schema-official";

export function PathViewer({
  paths,
  onPathClick,
}: {
  paths: Spec["paths"];
  onPathClick: (value: RT.ActivePath, event: React.MouseEvent) => void;
}) {
  let result = [];

  for (let [pathName, path] of Object.entries(paths)) {
    for (let [operationName, operation] of Object.entries(path)) {
      // TODO: excluding for demo
      if (pathName === "/pet" && operationName == "post") {
        result.push(
          <div className="path-viewer">
            <button
              className="u-full-width"
              key={`${pathName}-${operationName}`}
              onClick={onPathClick.bind(null, {
                path: pathName,
                name: operationName,
                operation: operation,
              })}
            >
              {pathName} -> {operationName}
            </button>
          </div>
        );
      }
    }
  }
  // https://github.com/microsoft/TypeScript/issues/33487#issuecomment-580049729
  return <>{result}</>;
}
