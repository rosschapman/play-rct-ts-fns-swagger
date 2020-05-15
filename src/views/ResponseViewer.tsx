import React from "react";
import { prettifyData } from "../utils";
import { MachineStatus } from "../managers/OperationManager";

export function ResponseViewer({
  data,
  requestUrl,
  operationState,
}: {
  data: any;
  requestUrl: string;
  operationState: any;
}) {
  const code = data.code;
  const formattedData = prettifyData(data.body);

  return (
    <div>
      <div>
        <h6>Requested Url:</h6>
        <pre>{requestUrl}</pre>
      </div>
      <table width="100%">
        <thead>
          <td>Code</td>
          <td>Body</td>
        </thead>
        <tr>
          <td valign="top">{code}</td>
          <td>
            <pre>{formattedData}</pre>
          </td>
        </tr>
      </table>
    </div>
  );
}
