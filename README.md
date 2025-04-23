# 📦 serverX

A tiny utility for managing server-only, request-scoped context in frameworks like Next.js using `react`’s `cache()` API. Perfect for safely sharing values across server components without prop-drilling or global state.

---

## ✨ Features

- ⚡ **Zero-dependency** – Built on top of native React features.
- 🧠 **Type-safe** – Fully typed with inference support.
- 🚫 **Server-only** – Enforced via `'server-only'` import.
- 🔒 **Safe-by-default** – Throws descriptive errors when accessing unset values.
- 🧩 **Composable** – Create multiple isolated contexts as needed.

## 💡 Why?

React Server Components make it hard to share values without threading them through props. This utility gives you a safe, request-scoped way to manage shared state like feature flags, user identity, or configuration—without lifting everything to the root.

---

## 📦 Installation

```bash
npm install @rewin/serverx
```

## 🧪 Example Usage

Create a typed context

```
// context/index.ts
import { contextFactory } from '@rewin/serverx';

export const [getUserName, setUserName] = contextFactory<string>('username');
```

Set the context in a server file

```
// app/page.tsx or a server action
import { setUserName } from './context';

setUserName('Bob Dylan');
```

Access the context later in the same request

```
// deeper down in a server component
import { getUserName } from './context';

const username = getUserName(); // 'Bob Dylan'
```

## 🛡️ Gotchas

You must call setContext() before calling getContext() during a request.

This only works in server environments. It will throw if used in the client.

Ideal for Next.js App Router or similar server component frameworks.

🧱 Built With

`react/cache`

## 🪪 License

MIT — Use freely
