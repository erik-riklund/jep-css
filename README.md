# 🎨 Just Enough Styling

_Don't replace the engine, just give it a more elegant dashboard._

> Please note that this project is in early development. 🚧

Inventing a new language that translates to CSS? Yes, that's exactly what's going on here. 🚀

The language reshapes CSS expression, offering a more human-friendly, declarative alternative without intending to replace it. This provides a more intuitive way to compose stylesheets, reducing the need for deep syntax knowledge.

---

### 🧱 Nesting for enhanced readability

?

```scss
div
{
  h1
  {
    color = green

    font-size = 200%
    text-transform = uppercase
  }

  &.some-class
  {
    button
    {
      border-color = black
    }
  }
}
```

---

### 🎯 Targeting specific devices

?

```scss
@use for tablet only
{
  // used only on tablets (576px -> 1023px)
}

@use for ..laptop
{
  // used up to and including laptops (0px -> 1439px)
}

@use for laptop..
{
  // used from laptops and up (1024px +)
}

@use for tablet .. laptop
{
  // used from tablets to laptops (576px -> 1439px)
}
```

---

### 🔮 Preferred color schemes

?

```scss
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

### 🔰 State management

?

```scss
div
{
  width = 80%


  @state collapsed
  {

  }
}
```