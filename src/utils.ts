import { Parameter } from "swagger-schema-official";

export function prettifyData(data: any) {
  return JSON.stringify(data, null, 4);
}

export function getModelExample(parameter: BodyParameter) {
  let result: { [key: string]: string } = {};

  // TODO: Schema definitely should exist on type Parameter
  Object.entries<{ type: string; format: string }>(
    parameter.schema.properties
  ).forEach((value) => {
    result[value[0]] = `<type: ${value[1].type}; format: ${value[1].format}>`;
  });

  return prettifyData(result);
}

export function validJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
