# 🎨 Just Enough Styling

_Don't replace the engine, just give it a more elegant dashboard._

> Please note that this project is in early development. 🚧

**Just Enough Styling (JES)** is a plain-language abstraction that reimagines the way CSS is written. Its purpose is not to replace CSS, but to provide a more expressive and readable alternative.

<img src=dashboard.png style="max-width:100%"><br>

The language is designed to be flexible and incremental. Use its expressive constructs for common patterns, and fall back to standard CSS when needed. Whether you’re working on simple layouts or complex edge cases, JES fits into your workflow without getting in the way.

---

### Decluttered property declarations ✔️

The syntax is clean and easy to read — no semicolons or colons. Properties are assigned with `=` and separated by line breaks. All standard CSS properties and values are supported, keeping the behavior familiar while improving readability.

```
div
{
  margin-inline = auto
  background-color = pink
}
```

---

### Nesting for enhanced readability ✔️

Nesting, a familiar pattern from SCSS and similar preprocessors, improves readability by  grouping related selectors. It’s a clear, structured way to reflect hierarchy without repeating parent selectors.

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

### Simplified media queries with device ranges ✔️

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

### Easy access to light and dark themes ✔️

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

### Class-based state management ✔️

The `@state` rule provides a clear, expressive way to apply styles based on class presence. It simplifies conditional styling and avoids the need for complex, manual selectors.

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

### Element relationships ✔️

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

### Attribute-based styling ✔️

The `@attribute` rule lets you style elements based on attributes. It can be used to target elements with specific attributes, attribute values, or the absence of an attribute.

```
div
{
  @attribute foo exists
  {
    // `div[foo]`
  }

  @attribute foo is missing
  {
    // `div:not([foo])`
  }

  @attribute foo is "bar"
  {
    // `div[foo="bar"]`
  }

  @attribute foo is not "bar"
  {
    // `div:not([foo="bar"])`
  }
}
```

---

### Context-based styling ✔️

The `@with` rule lets you style elements based on nearby or nested content — children, siblings, or adjacent elements. It expresses structural conditions in a clean, readable way, without relying on verbose selectors.

```
div
{
  @with child span
  {
    // `div:has(> span)`
  }

  @with child class foo
  {
    // `div:has(> .foo)`
  }

  @with sibling span
  {
    // `div:has(~ span)`
  }

  @with sibling class foo
  {
    // `div:has(~ .foo)`
  }

  @with adjacent span
  {
    // `div:has(+ span)`
  }

  @with adjacent class foo
  {
    // `div:has(+ .foo)`
  }

  @with descendant span
  {
    // `div:has(span)`
  }

  @with descendant class foo
  {
    // `div:has(.foo)`
  }
}
```

---

### Dynamic states and element conditions 🛠️

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

---

### Pseudo-element selectors 🧠

?

```
div
{
  @first
  {
    // `div:first-of-type`
  }

  @last
  {
    // `div:last-of-type`
  }

  @position 2
  {
    // `div:nth-of-type(2)`
  }

  @position -2
  {
    // `div:nth-last-of-type(2)`
  }
}
```