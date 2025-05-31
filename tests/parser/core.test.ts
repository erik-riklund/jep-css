import { it, expect } from 'bun:test'
import { parse } from 'module:parser'

it('should return an empty tree',
  () => 
  {
    expect(parse('')).toEqual([]);
  }
);

it('should parse an empty block',
  () => 
  {
    expect(parse('h1 {}')).toEqual([{ selectors: ['h1'] }]);
  }
);

it('should parse a block containing a comment',
  () => 
  {
    const styles = 'h1 {\n// this is a comment\n}';

    expect(parse(styles)).toEqual([{ selectors: ['h1'] }])
  }
);

it('should parse multiple blocks',
  () =>
  {
    const styles = 'h1 {}\nh2 {}h3 {}';

    expect(parse(styles)).toEqual([
      { selectors: ['h1'] }, { selectors: ['h2'] }, { selectors: ['h3'] }
    ]);
  }
);

it('should parse nested blocks',
  () =>
  {
    const styles = 'div {h1 {span {}}}';

    expect(parse(styles)).toEqual([
      {
        selectors: ['div'], children: [
          { selectors: ['h1'], children: [{ selectors: ['span'] }] }
        ]
      }
    ]);
  }
);

it('should parse deeply nested blocks',
  () =>
  {
    const styles = 'div {h1 {span {}} .child {.grandchild {} .sibling {}}}';

    expect(parse(styles)).toEqual([
      {
        selectors: ['div'], children: [
          { selectors: ['h1'], children: [{ selectors: ['span'] }] },
          {
            selectors: ['.child'], children: [
              { selectors: ['.grandchild'] }, { selectors: ['.sibling'] }
            ]
          }
        ]
      }
    ]);
  }
);

it('should parse a property declaration',
  () =>
  {
    const styles = 'h1 {\n  color = red\n }';

    expect(parse(styles)).toEqual([
      { selectors: ['h1'], declarations: [{ key: 'color', value: 'red' }] }
    ]);
  }
);

it('should parse multiple property declarations',
  () =>
  {
    const styles = 'h1 { color = red\n background-color = blue\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'], declarations: [
          { key: 'color', value: 'red' },
          { key: 'background-color', value: 'blue' }
        ]
      }
    ]);
  }
);

it('should parse multiple selectors',
  () =>
  {
    const styles = 'h1, h2 { color = red\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1', 'h2'],
        declarations: [{ key: 'color', value: 'red' }]
      }
    ]);
  }
);

it('should parse an attribute selector',
  () =>
  {
    const styles = 'input[type="radio"] { color = red\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['input[type="radio"]'],
        declarations: [{ key: 'color', value: 'red' }]
      }
    ]);
  }
);

it('should parse pseudo-class selectors',
  () =>
  {
    const styles = 'h1:hover { color = red\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1:hover'],
        declarations: [{ key: 'color', value: 'red' }]
      }
    ]);
  }
);

it('should parse pseudo-element selectors',
  () =>
  {
    const styles = 'h1::before { color = red\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1::before'],
        declarations: [{ key: 'color', value: 'red' }]
      }
    ]);
  }
);