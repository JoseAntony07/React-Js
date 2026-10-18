# React Hooks: Beginner Notes

## What are Hooks?

Hooks are functions that let React function components use features such as state, context, refs, and effects. Hook names start with `use`, for example `useState`.

## Where does React store hook values?

While a component is mounted, React keeps its hook data in memory and associates it with that component in React’s internal tree.

Hook values are **not automatically saved** to `localStorage` or a database. They generally reset when the component is removed or the page reloads. To keep data after a reload, save it separately, for example in `localStorage` or on a server.

## Hooks commonly used in projects

| Hook | Purpose | Example use |
|---|---|---|
| `useState` | Store a value that affects the UI | Search text, open menu, cart count |
| `useEffect` | Synchronize with something outside React | Browser title, timer, event subscription |
| `useContext` | Read shared data without passing props through every component | Theme, current user, language |
| `useRef` | Keep a value without triggering a render when it changes | Focus an input, store a timer ID |
| `useReducer` | Manage state with several related update actions | Shopping cart, multi-step form |
| `useMemo` | Cache the result of a calculation | Filter or sort a large list |
| `useCallback` | Keep the same function reference between renders when dependencies are unchanged | Pass a callback to a memoized child |
| `useId` | Generate an ID for accessibility | Connect an input with its label |

Other built-in hooks include `useTransition`, `useDeferredValue`, `useSyncExternalStore`, `useImperativeHandle`, `useLayoutEffect`, and `useDebugValue`. They serve more specific needs. React also supports custom hooks, which let you reuse logic.

## `useState`: simple UI state

Use `useState` for a value that changes the UI.

```jsx
import { useState } from "react";

function CartButton() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Add to cart ({count})
    </button>
  );
}
```

When the button is clicked, `setCount` updates the state. React renders the component again and shows the new count.

## `useReducer`: state with several actions

Use `useReducer` when state has several related ways to change.

```jsx
import { useReducer } from "react";

function cartReducer(cart, action) {
  if (action.type === "add") {
    return [...cart, action.item];
  }

  if (action.type === "clear") {
    return [];
  }

  return cart;
}

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <>
      <button onClick={() => dispatch({ type: "add", item: "Coffee" })}>
        Add coffee
      </button>

      <button onClick={() => dispatch({ type: "clear" })}>
        Clear cart
      </button>

      <p>Items in cart: {cart.length}</p>
    </>
  );
}
```

### `useState` vs `useReducer`

- Use `useState` for simple values, such as a name, count, or toggle.
- Consider `useReducer` when you have multiple related actions or complex update rules.

## `useEffect`: synchronize with something outside React

An effect runs after rendering and is useful for synchronizing with an external system, such as the browser document title.

```jsx
import { useEffect, useState } from "react";

function Cart() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Cart (${count})`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Add to cart
    </button>
  );
}
```

The `[count]` dependency tells React to run the effect when `count` changes.

## `useMemo`: cache a calculation

`useMemo` can reuse the result of a calculation while its dependencies stay the same.

```jsx
import { useMemo, useState } from "react";

const products = ["Coffee", "Tea", "Juice"];

function ProductSearch() {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products"
      />

      {filteredProducts.map((product) => (
        <p key={product}>{product}</p>
      ))}
    </>
  );
}
```

`useMemo` is primarily a performance optimization. A small, quick calculation usually doesn’t need it.

## `useCallback`: keep a function reference stable

A function is a value in JavaScript. Each time a component runs, a regular function declared inside it is newly created.

```js
const first = () => console.log("Hi");
const second = () => console.log("Hi");

console.log(first === second); // false
```

The functions contain the same code, but they are separate function values.

`useCallback` lets React reuse a function reference while its dependencies stay the same:

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

It does **not** stop the function from running. It helps keep the function prop from appearing to change when it is passed to a memoized child.

### Real-world example: product cards

```jsx
import { memo, useCallback, useState } from "react";

const products = [
  { id: 1, name: "Coffee" },
  { id: 2, name: "Tea" },
];

const ProductCard = memo(function ProductCard({ product, onAdd }) {
  console.log("Rendering:", product.name);

  return (
    <article>
      <h3>{product.name}</h3>
      <button onClick={() => onAdd(product.id)}>Add to cart</button>
    </article>
  );
});

function Shop() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = useCallback((productId) => {
    console.log("Adding product:", productId);
    setCartCount((count) => count + 1);
  }, []);

  return (
    <>
      <p>Cart items: {cartCount}</p>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={addToCart}
        />
      ))}
    </>
  );
}
```

When **Add to cart** is clicked:

```text
addToCart updates cartCount
        ↓
Shop renders again
        ↓
useCallback returns the same addToCart function
        ↓
ProductCard receives the same product and onAdd props
        ↓
memo can skip rendering ProductCard
```

Without `useCallback`, `Shop` would create a new `addToCart` function on every render. `memo` would see a different `onAdd` prop and render the product cards again.

### What does “the prop didn’t change” mean?

In this example, `onAdd` is a prop:

```jsx
<ProductCard onAdd={addToCart} />
```

A prop is a value passed from a parent component to a child component. React compares the old and new prop values. For functions, it checks whether they are the same function value—not whether their code looks the same.

With `useCallback`, React reuses the same function reference while dependencies are unchanged. `memo` can then skip rendering the child if its other props are unchanged too.

The child still has the function and can call it when its button is clicked. Skipping a render does not remove the function.

Use `useCallback` when keeping a function stable is useful, such as when passing it to a memoized child. You usually don’t need it for every event handler.

## `useContext`: share a value with nested components

Context lets a component read a value from a parent provider without passing it through every intermediate component.

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);

  return <header className={theme}>My Shop</header>;
}
```

## `useRef`: access an element without causing a render

A ref can hold a DOM element. Changing a ref does not trigger a render.

```jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} placeholder="Search products" />

      <button onClick={() => inputRef.current.focus()}>
        Focus search
      </button>
    </>
  );
}
```

## `useId`: connect a label and input

```jsx
import { useId } from "react";

function EmailField() {
  const emailId = useId();

  return (
    <>
      <label htmlFor={emailId}>Email</label>
      <input id={emailId} type="email" />
    </>
  );
}
```

## Why must Hooks be called at the top level?

React expects Hooks to be called in the same order on every render. It uses their order to match each Hook call with its stored value.

Do not put Hooks inside conditions or loops:

```jsx
// Avoid this: the effect is called only when showExtra is true
if (showExtra) {
  useEffect(() => {}, []);
}
```

Call the Hook at the top level and put the condition inside it:

```jsx
useEffect(() => {
  if (showExtra) {
    // Do something
  }
}, [showExtra]);
```

## Quick comparison

### `useState` vs `useReducer`

- `useState`: straightforward value and update.
- `useReducer`: multiple related actions and centralized update logic.

### `useEffect` vs `useMemo`

- `useEffect`: performs synchronization with something outside React.
- `useMemo`: caches a calculation result.
- Memory aid: **effect = do something; memo = remember a calculation.**

### `useMemo` vs `useCallback`

- `useMemo` caches a **calculated value**.
- `useCallback` caches a **function reference**.

## Common questions and answers

### Are hook values stored in `localStorage`?

No. React normally keeps hook values in memory while the component is mounted. Use `localStorage`, IndexedDB, cookies, or a server when data must persist beyond that.

### Does `useCallback` prevent a function from running?

No. It can keep the function reference stable. The function still runs when called.

### Does `useCallback` stop a child from rendering?

Not by itself. The child must also be memoized with `memo`, and its other props must remain unchanged. The child may still render if its own state or context changes.

### Does React check if the function’s code changed?

No. `useCallback` checks the dependency values you provide. If a dependency changes, React creates a new function reference.

```jsx
const addProduct = useCallback(() => {
  addToCart(productId);
}, [productId]);
```

If `productId` changes, React creates a new callback so it uses the latest ID.

### Should I use `useCallback` everywhere?

No. It is an optimization tool. Start with normal functions, then use it when you have a reason to prevent unnecessary renders or need a stable function dependency.

## Rules of Hooks

1. Call Hooks at the top level of a function component or custom Hook.
2. Don’t call Hooks inside conditions, loops, or nested functions.
3. Call Hooks only from React function components or custom Hooks.
4. Custom Hook names should start with `use`, for example `useAuth`.

See the [official React Hooks reference](https://react.dev/reference/react/hooks) for the complete built-in Hooks list.