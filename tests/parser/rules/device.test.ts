import { it, expect } from 'bun:test'
import { parseDeviceSelector } from 'module:parser/rules/device'

it('should parse a specific device selector',
  () =>
  {
    const selector = '@device mobile only';

    expect(parseDeviceSelector(selector)).toEqual('(max-width:575px)');
  }
);

it('should parse a device range selector with an upper limit',
  () =>
  {
    const selector = '@device .. laptop';

    expect(parseDeviceSelector(selector)).toEqual('(max-width:1439px)');
  }
);

it('should parse a device range selector with a lower limit',
  () =>
  {
    const selector = '@device tablet ..';

    expect(parseDeviceSelector(selector)).toEqual('(min-width:576px)');
  }
);

it('should parse a device range selector with both limits',
  () =>
  {
    const selector = '@device tablet .. laptop';

    expect(parseDeviceSelector(selector)).toEqual('(min-width:576px)and(max-width:1439px)');
  }
);