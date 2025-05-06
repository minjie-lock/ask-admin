import { createRoot } from 'react-dom/client';
import { StationBrowserRouter } from 'ask-router';
import { Alert, Spin } from 'antd';
import { useOnChangeValue } from 'ask-hooks';
import router from './routes';
import '@/styles/global.css'

const { ErrorBoundary } = Alert;

const root = document.querySelector('#root');

function Root() {
  const [loading] = useOnChangeValue(true)

  if (loading.value) {
    return (
      <div
        className="w-screen h-screen flex justify-center items-center"
      >
        <Spin
          spinning
          size="large"
        />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <StationBrowserRouter
        router={router}
      />
    </ErrorBoundary>
  )
}

createRoot(root!).render(<Root />)
