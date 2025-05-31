import { it, expect } from 'bun:test'
import { parse } from 'module:parser'

it('should parse device range blocks targeting a specific device',
  () =>
  {
    const styles = 'h1 { color = red\n @device mobile only{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'device',
            selectors: ['(max-width:575px)'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ]);
  }
);

it('should parse device range blocks targeting a device range',
  () =>
  {
    const styles = 'h1 { color = red\n @device tablet ..{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'device',
            selectors: ['(min-width:576px)'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ]);
  }
);

it('should parse a theme block',
  () =>
  {
    const styles = 'h1 { color = red\n @theme light{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'theme',
            selectors: ['(prefers-color-scheme:light)'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ]);
  }
);

it('should parse a theme block inside a device range block',
  () =>
  {
    const styles = 'h1 { color = red\n @device tablet ..{ @theme light{ color = blue\n } } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'device',
            selectors: ['(min-width:576px)and(prefers-color-scheme:light)'],
            children: [
              {
                type: 'theme',
                selectors: ['(prefers-color-scheme:light)'],
                declarations: [{ key: 'color', value: 'blue' }]
              }
            ]
          }
        ]
      }
    ]);
  }
);

it('should parse a `@print` block',
  () =>
  {
    const styles = 'h1 { color = red\n @print{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'print',
            selectors: ['print'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ])
  }
);