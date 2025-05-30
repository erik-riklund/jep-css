# 🎨 Just Enough Styling

_Don't replace the engine, just give it a more elegant dashboard._

> Please note that this project is in early development. 🚧

Inventing a new language that translates to CSS? Yes, that's exactly what's going on here. 🚀

The language reshapes CSS expression, offering a more human-friendly, declarative alternative
without intending to replace it. It provides a more intuitive way to compose stylesheets,
reducing the need for deep syntax knowledge.

---

### Nesting for enhanced readability

_A description will be added in the future._

```
div
{
  span // non-specific selector `div span`
  {
    color = red
  }

  @child element h1 // `div > h1`
  {
    color = green

    font-size = 200%
    text-transform = uppercase
  }

  @sibling class some-class // `div ~ .some-class`
  {
    button // `div ~ .some-class button`
    {
      border-color = black
    }
  }
}
```

---

### ?

_A description will be added in the future._

```
div
{
  
}
```

---

### Targeting specific devices

_A description will be added in the future._

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

---

### Preferred color schemes

_A description will be added in the future._

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

### State management

_A description will be added in the future._

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

  @state expanded and not loading
  {
    // `div.expanded:not(.loading)`
  }
}
```

---

### ?

_A description will be added in the future._

```
div
{
  @when empty
  {
    // `div:empty`
  }

  @when not empty
  {
    // `div:not(:empty)`
  }
}
```

---

### Relational selectors

_A description will be added in the future._

```
div
{
  @has child span
  {
    // `div:has(> span)`
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

  @has adjacent span where data-template is "foo"
  {
    // `div:has(+ span[data-template="foo"])`
  }
}
```

---

### ?

_A description will be added in the future._

```
div
{
  @on hover
  {
    // `div:hover`
  }

  @on disabled
  {
    // `div:disabled`
  }

  @on not disabled
  {
    // `div:not(:disabled)`
  }
}
```