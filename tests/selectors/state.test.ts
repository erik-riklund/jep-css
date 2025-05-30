import { it, expect } from 'bun:test'
import { parseStateSelector } from 'module:parser/selectors/state';

it('should parse a state selector',
  () =>
  {
    const selector = '@state collapsed';

    expect(parseStateSelector(selector)).toEqual('&.collapsed');
  }
);

it('should parse a chained state selector',
  () =>
  {
    const selector = '@state collapsed and expanded';

    expect(parseStateSelector(selector)).toEqual('&.collapsed.expanded');
  }
);

it('should parse an inverted state selector',
  () =>
  {
    const selector = '@state not collapsed';

    expect(parseStateSelector(selector)).toEqual('&:not(.collapsed)');
  }
);

it('should parse a chained inverted state selector',
  () =>
  {
    const selector = '@state not collapsed and disabled';

    expect(parseStateSelector(selector)).toEqual('&:not(.collapsed).disabled');
  }
);

it('should parse a complex state selector',
  () =>
  {
    const selector = '@state expanded and not disabled and active';

    expect(parseStateSelector(selector)).toEqual('&.expanded:not(.disabled).active');
  }
);