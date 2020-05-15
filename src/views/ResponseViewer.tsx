import React from "react";
import { prettifyData } from "../utils";

export function ResponseViewer({
  data,
  requestUrl,
}: {
  data: any;
  requestUrl: string;
}) {
  const code = data.code;
  const formattedData = prettifyData(data.body);

  return (
    <div>
      <div>
        <h6>Request Url</h6>
        <pre>{requestUrl}</pre>
      </div>
      <table width="100%">
        <thead>
          <td>Code</td>
          <td>Details</td>
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
