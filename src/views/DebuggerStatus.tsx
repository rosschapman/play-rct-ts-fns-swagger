import React from "react";
import { MachineStatus } from "../managers/OperationManager";

export function DebuggerStatus({
  process,
  status,
}: {
  process: NodeJS.Process;
  status: MachineStatus;
}) {
  return (
    (process.env.NODE_ENV === "development" && (
      <div className="status-debugger">
        <h6>Retool Challenge | {new Date(Date.now()).toISOString()}</h6>
        current_status: <strong>{status}</strong>
      </div>
    )) ||
    null
  );
}
