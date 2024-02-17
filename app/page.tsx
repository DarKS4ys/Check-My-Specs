import dynamic from 'next/dynamic'
 
const DynamicSystemData = dynamic(() => import('@/app/components/SystemData'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden max-w-6xl mx-auto flex flex-col gap-12 items-center p-6 md:p-8">
        <h1 className="text-5xl md:text-6xl text-center font-semibold">Check My Specs</h1>
        <DynamicSystemData />
    </main>
  );
}
