# Core Components

Here you find the list of the exported React Core Components.

| Index             |
| :---------------- |
| [<Link />](#link) |

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
