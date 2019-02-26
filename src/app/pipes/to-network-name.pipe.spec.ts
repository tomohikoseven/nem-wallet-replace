import { ToNetworkNamePipe } from './to-network-name.pipe';

describe('ToNetworkNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ToNetworkNamePipe();
    expect(pipe).toBeTruthy();
  });
});
