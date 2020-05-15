import React from "react";

import { MachineStatus, OperationManager } from "../managers/OperationManager";
import { EDIT_REQUEST_BODY } from "../constants";

/**
 *
 * Programatically builds the operation control set with
 */
export const OperationControls = ({
  operationState,
  handleCancelEditClick,
  handleEditClick,
  handleExecuteRequest,
  handleClear,
}: RT.ChildrenProps<OperationManager>) => {
  const cannotExecute =
    operationState.status !== MachineStatus.EDITING &&
    operationState.status !== MachineStatus.HAS_DATA_EDITING;
  const cannotClear =
    operationState.status !== MachineStatus.HAS_DATA &&
    operationState.status !== MachineStatus.HAS_DATA_EDITING;

  let result = [];

  if (
    operationState.status === MachineStatus.EDITING ||
    operationState.status === MachineStatus.HAS_DATA_EDITING
  ) {
    result.push(
      <button onClick={handleCancelEditClick}>Finish editing</button>
    );
  } else {
    result.push(<button onClick={handleEditClick}>{EDIT_REQUEST_BODY}</button>);
  }

  result.push(
    <button disabled={cannotExecute} onClick={handleExecuteRequest}>
      Execute
    </button>
  );

  result.push(
    <button disabled={cannotClear} onClick={handleClear}>
      Clear
    </button>
  );

  return <div className="operation-controls">{result}</div>;
};
