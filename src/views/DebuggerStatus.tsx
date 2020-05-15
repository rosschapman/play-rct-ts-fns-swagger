import React from "react";
import { MachineStatus } from "../managers/OperationManager";

export function DebuggerStatus({ status }: { status: MachineStatus }) {
  return process.env.NODE_ENV === "development" ? (
    <div className="status-debugger">
      Retool Challenge | {new Date(Date.now()).toISOString()}
      <h6>
        current_status: <strong>{status}</strong>
      </h6>
    </div>
  ) : null;
}
