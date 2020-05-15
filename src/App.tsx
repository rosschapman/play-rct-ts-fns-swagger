import React from "react";

import "./App.css";
import "./skeleton.css";

import { Spec } from "swagger-schema-official";
import { OperationManager, MachineStatus } from "./managers/OperationManager";
import { OperationViewerLayout } from "./views/OperationViewerLayout";
import { PathViewer } from "./views/PathViewer";
import { ResponseViewer } from "./views/ResponseViewer";
import { RequestViewer } from "./views/RequestViewer";
import { OperationControls } from "./views/OperationControls";
import { DebuggerStatus } from "./views/DebuggerStatus";

type PathManagerState = {
  activePath?: RT.ActivePath;
};

type PathManagerProps = {
  children: (props: {
    activePath?: RT.ActivePath;
    handlePathClick: (value: RT.ActivePath, event: React.MouseEvent) => void;
  }) => React.ReactNode;
};

class PathManager extends React.Component<PathManagerProps, PathManagerState> {
  state = {
    activePath: undefined,
  };

  handlePathClick(path: RT.ActivePath, event: React.MouseEvent) {
    event.preventDefault();
    this.setState({ activePath: path });
  }

  render() {
    return this.props.children({
      handlePathClick: this.handlePathClick.bind(this),
      activePath: this.state.activePath,
    });
  }
}

class App extends React.Component<{ spec: Spec }> {
  render() {
    const paths = this.props.spec.paths;

    return (
      <div className="App">
        <PathManager>
          {({ activePath, handlePathClick }) => (
            <div className="wrapper">
              <div
                className="four columns"
                style={{
                  background: "black",
                  color: "white",
                }}
              >
                <header>
                  <h1>PATH EXPLORER</h1>
                </header>
                <PathViewer paths={paths} onPathClick={handlePathClick} />
              </div>
              <div className="eight columns">
                {activePath ? (
                  <OperationViewerLayout activePath={activePath}>
                    <OperationManager
                      activePath={activePath}
                      spec={this.props.spec}
                    >
                      {({
                        operationState,
                        getRequestConfig,
                        handleCancelEditClick,
                        handleEditClick,
                        handleClear,
                        handleExecuteRequest,
                        handleOnChange,
                      }) => {
                        const canShowResponseReviewer =
                          operationState.status === MachineStatus.HAS_DATA ||
                          operationState.status ===
                            MachineStatus.HAS_DATA_EDITING;
                        const requestUrl = getRequestConfig().path;

                        return (
                          <>
                            <DebuggerStatus status={operationState.status} />
                            <hr></hr>
                            <h4>Request</h4>
                            <OperationControls
                              operationState={operationState}
                              handleCancelEditClick={handleCancelEditClick}
                              handleEditClick={handleEditClick}
                              handleClear={handleClear}
                              handleExecuteRequest={handleExecuteRequest}
                            />
                            <RequestViewer
                              operation={activePath.operation}
                              state={operationState}
                              handleOnChange={handleOnChange}
                            />

                            <h4>Response</h4>
                            {canShowResponseReviewer ? (
                              <ResponseViewer
                                data={operationState.data}
                                requestUrl={requestUrl}
                                state={operationState}
                              />
                            ) : (
                              <>Waiting for request...</>
                            )}
                          </>
                        );
                      }}
                    </OperationManager>
                  </OperationViewerLayout>
                ) : (
                  <div>
                    <h5>Waiting for path selection...</h5>
                  </div>
                )}
              </div>
            </div>
          )}
        </PathManager>
      </div>
    );
  }
}

//==========================================================
export default App;
