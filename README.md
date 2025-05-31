# 🎨 Just Enough Styling

_Don't replace the engine, just give it a more elegant dashboard._

> Please note that this project is in early development. 🚧

**Just Enough Styling (JES)** is a plain-language abstraction that reimagines the way CSS is written. It utilizes the power of plain language to express styling patterns, keeping the syntax simple and easy to read. As an abstraction, the language shields you from the underlying syntax, allowing you to focus on the core of your design.

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
*
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
*
{
  @state collapsed
  {
    // the selector is translated to `*.collapsed`.
    
    // `collapsed` is only an example, the class name can be anything.
  }

  @state not disabled
  {
    // `*:not(.disabled)`
  }

  @state expanded and active
  {
    // `*.expanded.active`
  }

  @state expanded and not loading and active
  {
    // `*.expanded:not(.loading).active`
  }
}
```

---

### Element relationships ✔️

The `@child`, `@sibling`, and `@adjacent` rules give you direct, readable control over element relationships. They map to standard CSS combinators, letting you express structure clearly without resorting to verbose selectors.

```
*
{
  @child span
  {
    // `* > span`
  }

  @child class foo
  {
    // `* > .foo`
  }

  @sibling span
  {
    // `* ~ span`
  }

  @adjacent span
  {
    // `* + span`
  }
}
```

---

### Attribute-based styling ✔️

The `@attribute` rule lets you style elements based on attributes. It can be used to target elements with specific attributes, attribute values, or the absence of an attribute.

```
*
{
  @attribute foo exists
  {
    // `*[foo]`
  }

  @attribute foo is missing
  {
    // `*:not([foo])`
  }

  @attribute foo is "bar"
  {
    // `*[foo="bar"]`
  }

  @attribute foo is not "bar"
  {
    // `*:not([foo="bar"])`
  }
}
```

---

### Context-based styling ✔️

The `@with` rule lets you style elements based on nearby or nested content — children, siblings, or adjacent elements. It expresses structural conditions in a clean, readable way, without relying on verbose selectors.

```
*
{
  @with child span
  {
    // `*:has(> span)`
  }

  @with child class foo
  {
    // `*:has(> .foo)`
  }

  @with sibling span
  {
    // `*:has(~ span)`
  }

  @with sibling class foo
  {
    // `*:has(~ .foo)`
  }

  @with adjacent span
  {
    // `*:has(+ span)`
  }

  @with adjacent class foo
  {
    // `*:has(+ .foo)`
  }

  @with descendant span
  {
    // `*:has(span)`
  }

  @with descendant class foo
  {
    // `*:has(.foo)`
  }
}
```

---

### Dynamic states and element conditions ✔️

The `@when` rule makes working with pseudo-classes like `:hover` or `:disabled` feel natural and readable. It supports negation and mirrors the logic of `@state`, but targets dynamic states and element conditions instead of class-based logic.

```
*
{
  @when active
  {
    // `*:active`
  }

  @when checked
  {
    // `*:checked`
  }

  @when disabled
  {
    // `*:disabled`
  }

  @when empty
  {
    // `*:empty`
  }

  @when enabled
  {
    // `*:enabled`
  }

  @when focused
  {
    // `*:focus`
  }

  @when focused visibly
  {
    // `*:focus-visible`
  }

  @when focused within
  {
    // `*:focus-within`
  }

  @when hovered
  {
    // `*:hover`
  }

  @when optional
  {
    // `*:optional`
  }

  @when required
  {
    // `*:required`
  }

  @when valid
  {
    // `*:valid`
  }

  @when visited
  {
    // `*:visited`
  }
}
```

?

```
input
{
  @attribute type is "checkbox"
  {
    @when not disabled and focused
    {
      // `input[type="checkbox"]:not(:disabled):focus`
    }
  }
}
```

---

### Selecting elements based on their position ✔️

?

```
*
{
  @first
  {
    // `*:first-of-type`
  }

  @last
  {
    // `*:last-of-type`
  }

  @position 2
  {
    // `*:nth-of-type(2)`
  }

  @position -2
  {
    // `*:nth-last-of-type(2)`
  }
}
```