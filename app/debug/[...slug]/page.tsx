export default async function DebugPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Route</h1>
      <p>Slug segments: {JSON.stringify(slug)}</p>
      <p>Full path: /{slug.join("/")}</p>
    </div>
  )
}
