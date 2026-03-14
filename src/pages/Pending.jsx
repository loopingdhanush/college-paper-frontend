import { useEffect, useState } from "react"
import api from "@/lib/api"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Trash2, CheckCircle, FileCheck } from "lucide-react"

export default function Pending() {

  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch papers
  const fetchPapers = async () => {
    try {
      setLoading(true)
      const res = await api.get(
        'papers/admin/pending'
      )
      setPapers(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchPapers()
  },[])

  const handleDownload = async (id) => {
  try {
    const res = await api.get(`/papers/${id}/download`)
    window.location.href = res.data.fileURL
  } catch (error) {
    console.error(error)
  }
}

const handleDelete = async (id) =>{
  try {
    const res = await api.delete(`/papers/${id}`)
    fetchPapers()
  } catch (error) {
    console.error(error)
  }
}

const handleApprove = async (id) =>{
  try {
    const res = await api.patch(`/papers/${id}/approve`)
    fetchPapers()
  } catch (error) {
    console.error(error)
  }
}

  return (
    <>
  {/* Mobile Header */}
  <div className="flex items-center gap-3 border-b px-5 py-3.5 md:hidden sticky top-0 bg-background/95 backdrop-blur z-10">
    <SidebarTrigger className="h-8 w-8 rounded-md border shadow-sm" />
    <span className="font-semibold text-sm tracking-tight">Pending Papers</span>
  </div>

  <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">

    {/* Header */}
    <div className="hidden md:block space-y-1">
      <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Admin</p>
      <h1 className="text-2xl font-semibold tracking-tight">Pending Papers</h1>
      <p className="text-sm text-muted-foreground">Review and approve submitted academic papers.</p>
    </div>

    <Separator className="hidden md:block" />

    {/* Count */}
    {!loading && papers.length > 0 && (
      <p className="text-xs text-muted-foreground">{papers.length} paper{papers.length !== 1 ? "s" : ""} awaiting review</p>
    )}

    {/* States */}
    {loading ? (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-5 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="h-8 w-full rounded-md mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    ) : papers.length === 0 ? (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-3 p-6">
          <div className="rounded-lg border border-dashed p-3">
            <FileCheck className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">All caught up</p>
            <p className="text-xs text-muted-foreground mt-0.5">No papers are pending review.</p>
          </div>
        </CardContent>
      </Card>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <Card key={paper._id} className="group flex flex-col hover:shadow-md transition-shadow duration-200 py-0">

            <CardContent className="flex-1 p-5 pb-0  space-y-3">

              {/* Subject */}
              <p className="font-medium text-sm leading-snug line-clamp-2">
                {paper.subject}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs rounded-full font-normal">
                  {paper.department}
                </Badge>
                <Badge variant="outline" className="text-xs rounded-full font-normal">
                  {paper.type}
                </Badge>
                <Badge variant="outline" className="text-xs rounded-full font-normal tabular-nums">
                  {paper.year}
                </Badge>
              </div>

              {/* Downloads */}
              <p className="text-xs">
                {paper.downloads.toLocaleString()} downloads
              </p>

            </CardContent>

            {/* Footer */}
            <CardFooter className="px-5 py-3 bg-gray-100 flex items-center justify-between gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 gap-1.5"
                onClick={() => handleDownload(paper._id)}
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>

              <Button
                size="sm"
                variant="default"
                className="flex-1 gap-1.5"
                onClick={() => handleApprove(paper._id)}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Approve
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDelete(paper._id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </CardFooter>

          </Card>
        ))}
      </div>
    )}

  </div>
</>
  )
}