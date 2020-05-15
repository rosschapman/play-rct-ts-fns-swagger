import React from "react";
import { MachineStatus } from "../managers/OperationManager";
import { Operation, Parameter } from "swagger-schema-official";
import { getModelExample } from "../utils";

export function RequestViewer({
  operation,
  state,
  handleOnChange,
}: {
  operation: Operation;
  state: any;
  handleOnChange: any;
}) {
  return (
    <>
      <form onChange={handleOnChange}>
        <table width="100%">
          {operation.parameters.map((parameter: Parameter) => {
            const modelExample = getModelExample(parameter);
            return (
              <div key={`${parameter.in}-${parameter.name}`}>
                <thead>
                  <td>Name</td>
                  <td>Description</td>
                </thead>
                <tr>
                  <td
                    valign="top"
                    style={{
                      width: "50%",
                    }}
                  >
                    <div>
                      {parameter.name}{" "}
                      {parameter.required && (
                        <em style={{ color: "red" }}>* (required)</em>
                      )}
                    </div>
                    <div>
                      FORMAT:{" "}
                      <pre
                        style={{
                          fontSize: ".7em",
                          border: "1px solid lightgray",
                          padding: "1em",
                        }}
                      >
                        {modelExample}
                      </pre>
                    </div>
                  </td>
                  <td valign="top">
                    {/* Fieldset is an awesome way to disable a form! */}
                    <fieldset
                      disabled={
                        state.status !== MachineStatus.EDITING &&
                        state.status !== MachineStatus.HAS_DATA_EDITING
                      }
                    >
                      <textarea key={parameter.name}></textarea>
                    </fieldset>
                  </td>
                </tr>
              </div>
            );
          })}
        </table>
      </form>
    </>
  );
}
