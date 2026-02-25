import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';
import { createAppStore } from './store';

const container = document.getElementById('root');
if (container != null) {
  const root = createRoot(container);
  const store = createAppStore();

  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
