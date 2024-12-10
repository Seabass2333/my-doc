interface DocumentPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = await params

  return <div>DocumentPage ID: {documentId}</div>
}

export default DocumentPage
