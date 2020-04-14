import AntdPortalHost from '@ant-design/react-native/lib/portal/portal-host';

class PortalHost extends AntdPortalHost {
  componentDidMount() {
    const manager = this._manager;
    const queue = this._queue;

    while (queue.length && manager) {
      const action = queue.pop();
      if (!action) {
        continue;
      }

      // tslint:disable-next-line:switch-default
      switch (action.type) {
        case 'mount':
          manager.mount(action.key, action.children);
          break;
        case 'update':
          manager.update(action.key, action.children);
          break;
        case 'unmount':
          manager.unmount(action.key);
          break;
      }
    }
  }
}

export default PortalHost;
