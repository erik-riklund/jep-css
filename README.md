# 🎨 Just Enough Styling

_Don't replace the engine, just give it a more elegant dashboard._

> Please note that this project is in early development. 🚧

Inventing a new language that translates to CSS? Yes, that's exactly what's going on here. 🚀

<img src=dashboard.png style="max-width:100%"><br>

The language reshapes CSS expression, offering a more human-friendly, declarative alternative
without intending to replace it. It provides a more intuitive way to compose stylesheets,
reducing the need for deep syntax knowledge.

The best part of JES is its progressive approach. You can use only the rules you need, and only the features you need. You can blend in standard CSS selectors to handle edge cases if the need arise - JES is flexible enough to handle any situation.

---

### Nesting for enhanced readability ✔️

Nesting isn't a new idea — it’s a familiar pattern from SCSS and similar preprocessors. In JES, it improves readability by keeping related selectors visually grouped. It's a clean, structured way to reflect hierarchy without repeating parent selectors.

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

### Targeting specific devices ✔️

JES provides a clean, readable syntax for responsive design. The `@device` rule lets you define styles for common breakpoints without writing verbose media queries. Use ranges combined with keywords like `tablet` or `laptop` to express intent directly.

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

### Preferred color schemes ✔️

JES makes it easy to adapt styles to the user’s system theme. The `@theme` rule maps directly to `prefers-color-scheme`, letting you define light and dark mode styles inline, right where they’re relevant.

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

### State management ✔️

JES simplifies class-based state styling with the `@state` rule. It provides a clear, expressive way to define styles based on class presence, combinations, and negations without manually crafting complex selectors.

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

### Styling based on the presence of elements 🧠

With the `@has` rule, JES makes it easy to style elements based on what’s around or inside them. Whether it’s a child, descendant, sibling, or adjacent element, you can express structural conditions in a clean, readable way without diving into complex selector syntax.

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

  @has descendant span
  {
    // `div:has(> * > span)`
  }
  
  @has sibling span
  {
    // `div:has(~ span)`
  }

  @has adjacent span
  {
    // `div:has(+ span)`
  }
}
```

---

### Pseudo-classes made simple 🧠

The `@when` rule in JES lets you work with pseudo-classes like `:hover` or `:disabled` in a natural, readable way. It supports negation and mirrors the logic used in `@state`, but targets dynamic states and element conditions instead of class names.

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