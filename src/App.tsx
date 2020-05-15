import React from "react";

import "./App.css";
import "./skeleton.css";

import { Spec } from "swagger-schema-official";
import { OperationManager, MachineStatus } from "./managers/OperationManager";
import { OperationViewerLayout } from "./views/OperationViewerLayout";
import { PathViewer } from "./views/PathViewer";
import { ResponseViewer } from "./views/ResponseViewer";
import { ParametersViewer } from "./views/ParametersViewer";
import { OperationControls } from "./views/OperationControls";

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
  handleTryClick() {
    // turn on interactive mode
  }

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
                  <h1>PATHS</h1>
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
                            <OperationControls
                              operationState={operationState}
                              handleCancelEditClick={handleCancelEditClick}
                              handleEditClick={handleEditClick}
                              handleClear={handleClear}
                              handleExecuteRequest={handleExecuteRequest}
                            />
                            <ParametersViewer
                              operation={activePath.operation}
                              state={operationState}
                              handleOnChange={handleOnChange}
                            />

                            <h4>Responses</h4>
                            {canShowResponseReviewer ? (
                              <ResponseViewer
                                data={operationState.data}
                                requestUrl={requestUrl}
                              />
                            ) : (
                              <>
                                <p>Waiting for request...</p>
                                <img
                                  alt="fun gif"
                                  src="https://media.giphy.com/media/ZXKZWB13D6gFO/giphy.gif"
                                />
                              </>
                            )}
                          </>
                        );
                      }}
                    </OperationManager>
                  </OperationViewerLayout>
                ) : (
                  <div>
                    <h5>Waiting for path selection...</h5>
                    <img
                      alt="fun gif"
                      src="https://media.giphy.com/media/Tex62CGWLpOHpctHOS/giphy.gif"
                    />
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
/* 
Example generator: 
https://github.com/swagger-api/swagger-ui/blob/master/src/core/plugins/samples/fn.js

look how confusing all the boolean handling is in: 
https://github.com/swagger-api/swagger-ui/blob/0b3489b52dfc3494b8c29201889df2668b07fb53/src/core/components/parameters/parameters.jsx

*/

//==========================================================
export default App;
