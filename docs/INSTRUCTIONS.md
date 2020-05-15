OpenAPI Specification (formerly Swagger Specification) is an API description format for REST APIs. An OpenAPI file allows you to describe your entire API, including:

    Available endpoints (/users) and operations on each endpoint (GET /users, POST /users)
    Operation parameters Input and output for each operation
    Authentication methods
    Contact information, license, terms of use and other information.


API specifications can be written in YAML or JSON. The format is easy to learn and readable to both humans and machines. The complete OpenAPI Specification can be found on GitHub: OpenAPI 3.0 Specification

https://swagger.io/docs/specification/about

Engineering teams rarely work in a vacuum. They usually make use of upstream services which might be internal or external. External third-party services invest heavily in documentation to make it easy for engineers to use their APIs. However, internal APIs are often-times under-documented, which makes it harder for other engineers to use those internal APIs.

One way to solve this is to create an OpenAPI Specification to document internal APIs. This has the added bonus of making it easy for other tools (like Retool!) to parse the specification and generate a friendly interface for making request to the internal API.

Assignment: Using React, build an interface that 

    Lets users provide an OpenAPI Specification like https://petstore.swagger.io/v2/swagger.json
    Generates a UI that allows users to make requests to the documented API directly from the browser.
    Shows the resulting payload from the executed API query.


The only things we will be considering are:

    The functionality of the components for making API requests
    Basic styling of the components
    The structure of the code


We would (at least) like to see something similar to the UI here at http://petstore.swagger.io/. However, if you think you can do better we would love to see what you can come up with.  The code for this library is open sourced here, but please don’t just import the library grinning face with big eyes.

You should time-box this to at most 5 hours — we don’t expect you to implement all the minutiae in the spec. Just make sure to let us know what you chose to prioritize building and why, and if you do decide to spend more time, let us know so we can calibrate expectations. 

After you finish the take home please make sure to send us the finished project (zip, github, tar balls, whatever is easiest for you).
