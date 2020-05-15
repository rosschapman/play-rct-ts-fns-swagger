import { Parameter } from "swagger-schema-official";

export function prettifyData(data: any) {
  return JSON.stringify(data, null, 4);
}

export function getModelExample(parameter: Parameter) {
  let result = {};

  Object.entries(parameter.schema.properties).forEach((value) => {
    result[value[0]] = `<type: ${value[1].type}; format: ${value[1].format}>`;
  });

  return prettifyData(result);
}
