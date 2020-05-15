/* eslint-disable no-fallthrough */
import React from "react";
import { Spec } from "swagger-schema-official";

// TYPES ================================================================================>

export enum MachineStatus {
  IDLE = "IDLE",
  EDITING = "EDITING",
  WAITING = "WAITING",
  HAS_DATA_EDITING = "HAS_DATA_EDITING",
  HAS_DATA = "HAS_DATA",
}

//==========================

class Machine {
  transition(event: MachineStatus, state: State, payload?: any): State {
    const currentStatus = state.status;

    switch (event) {
      case MachineStatus.EDITING:
        if (
          [MachineStatus.HAS_DATA_EDITING, MachineStatus.IDLE].includes(
            currentStatus
          )
        ) {
          return {
            ...state,
            status: MachineStatus.EDITING,
            data: {},
          };
        }
      case MachineStatus.IDLE:
        if (
          [MachineStatus.HAS_DATA, MachineStatus.EDITING].includes(
            currentStatus
          )
        ) {
          return {
            ...state,
            status: MachineStatus.IDLE,
            data: {},
          };
        }
      case MachineStatus.WAITING:
        if (
          [MachineStatus.HAS_DATA_EDITING, MachineStatus.EDITING].includes(
            currentStatus
          )
        ) {
          return {
            ...state,
            status: MachineStatus.WAITING,
          };
        }
      case MachineStatus.HAS_DATA_EDITING:
        if (
          [MachineStatus.WAITING, MachineStatus.HAS_DATA].includes(
            currentStatus
          )
        ) {
          return {
            ...state,
            status: MachineStatus.HAS_DATA_EDITING,
            data: payload,
          };
        }
      case MachineStatus.HAS_DATA:
        if ([MachineStatus.HAS_DATA_EDITING].includes(currentStatus)) {
          return {
            ...state,
            status: MachineStatus.HAS_DATA,
          };
        }
      default:
        throw "NOPE";
    }
  }
}

export class OperationManager extends React.Component<Props, State> {
  state = {
    status: MachineStatus.IDLE,
    formData: "",
    data: {
      code: "",
      body: "",
    },
    requestConfig: {
      basePath: "",
      path: "",
      consumes: "",
      produces: "",
    },
  };

  machine = new Machine();

  getRequestConfig() {
    return {
      path: `${this.props.spec.basePath}${this.props.activePath.path}`,
      consumes: this.props.activePath.operation.consumes[0],
      produces: this.props.activePath.operation.produces[0],
    };
  }

  handleEditClick = () => this.dispatch({ event: MachineStatus.EDITING });
  handleCancelEditClick = () => {
    if (this.getStatus() === MachineStatus.EDITING) {
      return this.dispatch({ event: MachineStatus.IDLE });
    }

    if (this.getStatus() === MachineStatus.HAS_DATA_EDITING) {
      return this.dispatch({ event: MachineStatus.HAS_DATA });
    }
  };
  handleExecuteRequest = () => {
    this.dispatch({
      event: MachineStatus.WAITING,
      op: this.execute,
    });
  };
  handleClear = () => {
    if (this.getStatus() === MachineStatus.HAS_DATA_EDITING) {
      this.dispatch({ event: MachineStatus.EDITING });
    }
    if (this.getStatus() === MachineStatus.HAS_DATA) {
      this.dispatch({ event: MachineStatus.IDLE });
    }
  };

  execute: Op = async () => {
    const config = this.getRequestConfig();
    const url = config.path;
    const operationName = this.props.activePath.name;
    const headers = {
      "Content-Type": config.consumes,
    };
    const fetchOptions = {
      method: operationName,
      headers: headers,
      body: this.state.formData,
    };

    try {
      const data = await fetch(url, fetchOptions);

      if (data.status !== 200) {
        throw {
          code: data.status,
          body: data.statusText,
        };
      } else {
        const response = await data.json();

        return this.machine.transition(
          MachineStatus.HAS_DATA_EDITING,
          this.state,
          {
            code: data.status,
            body: response,
          }
        );
      }
    } catch (e) {
      return this.machine.transition(
        MachineStatus.HAS_DATA_EDITING,
        this.state,
        e
      );
    }
  };

  async dispatch({
    event,
    data,
    op,
  }: {
    event: MachineStatus;
    data?: any;
    op?: Op;
  }) {
    const nextImmediateState = await this.machine.transition(
      event,
      this.state,
      data
    );
    this.setState(nextImmediateState);

    // Side effect
    if (op) {
      const nextPostOpState = await op();
      this.setState(nextPostOpState);
    }
  }

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formData: event.target.value,
    });
  };

  getStatus() {
    return this.state.status;
  }

  componentWillUnmount() {
    console.log("unmounted");
  }

  render() {
    return this.props.children({
      operationState: this.state,
      getRequestConfig: this.getRequestConfig.bind(this),
      handleCancelEditClick: this.handleCancelEditClick.bind(this),
      handleEditClick: this.handleEditClick.bind(this),
      handleClear: this.handleClear.bind(this),
      handleExecuteRequest: this.handleExecuteRequest.bind(this),
      handleOnChange: this.handleOnChange.bind(this),
    });
  }
}

// TYPES ================================================================================>
type Props = {
  spec: Spec;
  activePath: RT.ActivePath;
  children: (props: {
    operationState: State;
    getRequestConfig: OperationManager["getRequestConfig"];
    handleCancelEditClick: OperationManager["handleCancelEditClick"];
    handleEditClick: OperationManager["handleEditClick"];
    handleClear: OperationManager["handleClear"];
    handleExecuteRequest: OperationManager["handleExecuteRequest"];
    handleOnChange: OperationManager["handleOnChange"];
  }) => React.ReactNode;
};

type State = {
  status: MachineStatus;
  formData: string;
  data: any;
};

type Op = () => Promise<State>;
