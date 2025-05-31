> Please note that this project is in early development. 🚧

**Poise** is a language that reimagines how stylesheets are written. It utilizes the power of plain language to express styling patterns, keeping the syntax simple and easy to read. As an abstraction, the language hides the underlying CSS syntax, both reducing the need for deep syntax knowledge and allowing focus to remain on the design.

<img src=dashboard.png style="max-width:100%"><br>

The language is designed to be flexible and incremental. Use its expressive constructs for common patterns, and fall back to standard CSS selectors when needed. _Extend this later..._

---

### Decluttered property declarations

_Add a description._

```
div
{
  margin-inline = auto
  background-color = pink
}
```

---

### Nesting for enhanced readability

_Add a description._

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

### Simplified media queries with device ranges

_Add a description._

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

@print
{
  // @media print
}
```

> ℹ️ The available device names are `mobile`, `tablet`, `laptop`, and `desktop`.

---

### Easy access to light and dark themes

_Add a description._

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

### Class-based state management

_Add a description._

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

### Element relationships

_Add a description._

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

### Attribute-based styling

_Add a description._

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

### Context-based styling

_Add a description._

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

### Dynamic states and element conditions

_Add a description._

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

---

### Selecting elements based on their position

_Add a description._

```
*
{
  @first
  {
    // `*:nth-of-type(1)`
  }

  @last
  {
    // `*:nth-last-of-type(1)`
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