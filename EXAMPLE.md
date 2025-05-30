```scss
ul.items
{
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;

  li button
  {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    border: none;
    border-bottom: 1px solid gray;
    background-color: white;
    padding: 0.75rem 1.25rem;

    span:first-of-type
    {
      font-size: 110%;
      font-weight: 600;
    }

    &:disabled
    {
      opacity: 0.5;
    }

    &:not(:disabled)
    {
      cursor: pointer;

      &.expanded
      {
        color: white;
        background-color: black;
        border-radius: 0.5rem;

        span:last-of-type
        {
          display: none;
        }
      }

      &:not(&.expanded)
      {
        color: black;

        &:hover
        {
          background-color: white;
        }
      }
    }
  }
}
```