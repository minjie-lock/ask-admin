import { createRoot } from 'react-dom/client';
import { StationBrowserRouter } from 'ask-router';
import router from './routes';
import { Alert, Flex, Spin } from 'antd';
import { useOnChangeValue } from 'ask-hooks';
import '@/styles/global.css'


const { ErrorBoundary } = Alert;

const root = document.querySelector('#root');

const Root = () => {

  const [loading] = useOnChangeValue(true)

  if (loading.value) {
    return (
      <Flex
        justify="center"
        align="center"
        className="w-screen h-screen"
      >
        <Spin
          spinning
          size="large"
        />
      </Flex>
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
