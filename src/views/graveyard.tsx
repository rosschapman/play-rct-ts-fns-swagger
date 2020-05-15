function ParameterBodyFormFields({ schema }: { schema: Schema }) {
  if (schema.type === "array") {
    return "TODO";
  }

  let result = [];

  for (let [key, value] of Object.entries(schema.properties)) {
    const component = (
      <li
        style={{
          marginBottom: "1em",
          borderBottom: "1px",
        }}
      >
        <label id={key}>
          <div>
            {key} {isRequiredDisplay(schema)}
          </div>
          <div>
            <div>TYPE: {value.type}</div>
            <div>{value.format && `FORMAT: ${value.format}`}</div>
          </div>
        </label>
        {renderField(key, value)}
      </li>
    );

    result.push(component);
  }

  return result;

  function isRequiredDisplay(schema, key) {
    return schema.required && schema.required.includes(key) ? "* required" : "";
  }

  function renderField(key, value) {
    switch (value.type) {
      case "object":
        const propertyList = Object.keys(value.properties).join(",");
        return (
          <>
            TODO: construct an object with properties: {propertyList}
            <textarea id={key} name={key}>
              {}
            </textarea>
          </>
        );
      case "array":
        let formatStr = "";
        if (value.items.type === "object") {
          formatStr = JSON.stringify(value.items.properties);
        } else {
          formatStr = value.items.type;
        }

        return (
          <>
            Add a comma separated list of: <em>{formatStr}</em>
            <textarea id={key} name={key}></textarea>
          </>
        );
      case "string":
      case "number":
      case "integer":
      case "boolean":
        const example = value.example || value.type;
        return (
          <>
            <input id={key} name={key} placeholder={example} />
          </>
        );
      default:
        break;
    }
  }
}

serializeFormData = () => {
  const replacer = (key, value) => {
    const found = this.props.activePath.operation.parameters[0].schema
      .properties[key];

    if (found) {
      const type = this.props.activePath.operation.parameters[0].schema
        .properties[key].type;

      if (type === "array") {
        return value.split(",");
      }

      if (type === "object") {
        return value;
      }
    }

    return value;
  };

  return JSON.stringify(this.state.formData, replacer);
};
