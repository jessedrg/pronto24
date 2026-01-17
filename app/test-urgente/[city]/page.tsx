export default async function TestUrgentePage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test Urgente Route</h1>
      <p>City param: {city}</p>
      <p>If you see this, the route works!</p>
    </div>
  )
}
