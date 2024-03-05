import NotFoundView from '@/views/NotFoundView'

export const metadata = {
  title: '404 Page Not Found!',
}

export default function NotFoundPage() {
  return (
    <div>
      {/* You can add any additional styling or components here */}
      <NotFoundView />
    </div>
  )
}
