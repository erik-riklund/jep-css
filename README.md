# 🎨 Just Enough Styling

_Don't replace the engine, just give it a more elegant dashboard._

> Please note that this project is in early development. 🚧

**Just Enough Styling (JES)** reshapes how we write CSS by introducing a more human-friendly, declarative syntax that uses plain language to describe styles. It brings clarity and structure to styling, allowing you to compose stylesheets that are easier to read, write, and maintain.

<img src=dashboard.png style="max-width:100%"><br>

JES is progressive and flexible by design. You can adopt it incrementally — use its expressive, built-in constructs for common patterns, and fall back on standard CSS selectors whenever needed. Whether you're building simple layouts or handling complex edge cases, JES adapts to your workflow without getting in the way.

---

### Nesting for enhanced readability ✔️

Nesting is a familiar pattern from SCSS and similar preprocessors. It improves readability by keeping related selectors visually grouped. It's a clean, structured way to reflect hierarchy without repeating parent selectors.

```
div
{
  span 
  {
    // `div span`
  }
}

form
{
  fieldset
  {
    input
    {
      // `form fieldset input`
    }

    button
    {
      // `form fieldset button`
    }
  }
}
```

---

### `@device` ✔️

The `@device` rule simplifies responsive design by replacing verbose media queries with clear, intent-driven syntax. Use readable keywords like `tablet` and `laptop` to target breakpoints directly — making your styles more concise and meaningful.

```
@device tablet only
{
  // @media screen and (min-width: 576px) and (max-width: 1023px)
}

@device .. laptop
{
  // @media screen and (max-width: 1439px)
}

@device laptop ..
{
  // @media screen and (min-width: 1024px)
}

@device tablet .. laptop
{
  // @media screen and (min-width: 576px) and (max-width: 1439px)
}
```

> ℹ️ The available device names are `mobile`, `tablet`, `laptop`, and `desktop`.

---

### `@theme` ✔️

The `@theme` rule ties directly to `prefers-color-scheme`, making it easy to define light and dark mode styles inline — right where they matter. No need to separate theme logic from your core styles.

```
div
{
  background-color = white

  @theme dark
  {
    background-color = black
  }
}
```

---

### `@state` ✔️

The `@state` rule offers a clear, expressive way to style elements based on class presence without writing complex selectors by hand. It makes conditional styling more intuitive and readable.

```
div
{
  @state collapsed
  {
    // the selector is translated to `div.collapsed`.
    
    // `collapsed` is only an example, the class name can be anything.
  }

  @state not disabled
  {
    // `div:not(.disabled)`
  }

  @state expanded and active
  {
    // `div.expanded.active`
  }

  @state expanded and not loading and active
  {
    // `div.expanded:not(.loading).active`
  }
}
```

---

### `@child`, `@sibling`, and `@adjacent` ✔️

The `@child`, `@sibling`, and `@adjacent` rules give you direct, readable control over element relationships. They map to standard CSS combinators, letting you express structure clearly without resorting to verbose selectors.

```
div
{
  @child span
  {
    // `div > span`
  }

  @child class foo
  {
    // `div > .foo`
  }

  @sibling span
  {
    // `div ~ span`
  }

  @adjacent span
  {
    // `div + span`
  }
}
```

---

### `@attribute` 🛠️

The `@attribute` rule turns dense attribute selectors into clear, plain-language expressions. Whether you're checking for existence, matching values, or applying negations, it makes attribute-based styling far more intuitive.

```
div
{
  @attribute foo
  {
    // `div[foo]`
  }

  @attribute foo missing
  {
    // `div:not([foo])`
  }

  @attribute foo equals "bar"
  {
    // `div[foo="bar"]`
  }

  @attribute foo not equals "bar"
  {
    // `div:not([foo="bar"])`
  }
}
```

---

### `@has` 🧠

The `@has` rule lets you style elements based on their surrounding or nested content—children, descendants, siblings, or adjacent elements. It brings structural conditions into a clean, readable format without complex selector syntax.

```
div
{
  @has child span
  {
    // `div:has(> span)`
  }

  @has child class foo
  {
    // `div:has(> .foo)`
  }

  @has sibling span
  {
    // `div:has(~ span)`
  }

  @has adjacent span
  {
    // `div:has(+ span)`
  }

  @has descendant span
  {
    // `div:has(span)`
  }
}
```

---

### `@when` 🧠

The `@when` rule makes working with pseudo-classes like `:hover` or `:disabled` feel natural and readable. It supports negation and mirrors the logic of `@state`, but targets dynamic states and element conditions instead of class-based logic.

```
div
{
  @when hovered
  {
    // `div:hover`
  }

  @when disabled
  {
    // `div:disabled`
  }

  @when not disabled
  {
    // `div:not(:disabled)`
  }

  @when empty
  {
    // `div:empty`
  }
}
```