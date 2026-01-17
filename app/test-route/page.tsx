export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test Page Working</h1>
      <p>If you see this, Next.js routing works.</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  )
}
