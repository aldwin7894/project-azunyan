import { getIntrospectionQuery } from "graphql";
import * as fs from "node:fs";

import {
  getIntrospectedSchema,
  minifyIntrospectionQuery,
} from "@urql/introspection";

await fetch("https://graphql.anilist.co", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    query: getIntrospectionQuery({
      descriptions: false,
    }),
  }),
})
  .then(result => result.json())
  .then(({ data }) => {
    const minified = minifyIntrospectionQuery(getIntrospectedSchema(data), {
      includeScalars: true,
      includeDirectives: true,
      includeEnums: true,
      includeInputs: true,
    });
    fs.writeFileSync("./anilist-schema.json", JSON.stringify(minified));
  });
