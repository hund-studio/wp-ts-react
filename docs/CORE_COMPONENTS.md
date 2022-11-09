# Core Components

Here you find the list of the exported React Core Components.

| Index                     |
| :------------------------ |
| [\<Link /\>](#link)       |
| [\<Laygrid /\>](#laygrid) |

## \<Link /\>

The `<Link />` component is a wrapper around the original [React Router Link](https://reactrouter.com/en/main/components/link) whch automatically render an HTML `<a />` tag when use to link to external websites. You can import it from:

```typescript
import { Link } from "@core/Link";
```

This is the behind the scenes implementation:

```typescript
// 📄 /core/front/components/Link/link.tsx
import { FC } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

const Link: FC<LinkProps> = ({ to, ...props }) => {
  const isExternalTo =
    typeof to === "string" &&
    ["http://", "https://"].some((prefix) => to.startsWith(prefix));

  return isExternalTo ? (
    <a href={to} {...props} />
  ) : (
    <RouterLink to={to} {...props} />
  );
};

export { Link };
```

## \<Laygrid\>

The `<Laygrid>` component render the current queryed Grid. In order to use it you must have the Laygridder plugin installed and active. You can import it from:

```typescript
import { Laygrid } from "@core/Laygrid";
```

The `<Laygrid>` component implements the following PropsInterface:

```typescript
interface LaygridProps {
  data?: string;
}
```

| Property Name | Value Type | Required | Default                  | Description                                               |
| :------------ | :--------- | :------- | :----------------------- | :-------------------------------------------------------- |
| `data`        | `string`   | false    | current queryed resource | html string value generated from `get_laygrid()` function |
