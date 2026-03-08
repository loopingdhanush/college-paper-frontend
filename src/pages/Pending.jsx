import { useEffect, useState } from "react"
import api from "@/lib/api"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
      <div className="flex items-center gap-4 border-b px-6 py-4 md:hidden">
        <SidebarTrigger className="h-9 w-9 rounded-lg border bg-background shadow-sm hover:bg-accent transition" />
        <h2 className="text-lg font-semibold">Pending Papers</h2>
      </div>

      <div className="px-10 py-8 space-y-8">

        {/* Desktop Title */}
        <h1 className="text-3xl font-bold tracking-tight hidden md:block">
          Pending Papers
        </h1>

        <p className="text-muted-foreground">
          Approve academic papers.
        </p>


        {/* Papers Grid */}
        {loading ? (
          <div className="text-muted-foreground">
            Loading papers...
          </div>
        ) : papers.length === 0 ? (
          <div className="text-muted-foreground">
            No papers found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {papers.map((paper) => (
              <Card
                key={paper._id}
                className="hover:shadow-lg transition"
              >
                <CardContent className="space-y-2">

                    <h3 className="font-semibold text-lg">
                      {paper.subject}
                    </h3>
                    
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">
                      {paper.department}
                    </Badge>
                    <Badge>
                      {paper.type}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {paper.year}
                    </p>
                  </div>

                  <div className="flex flex-col  justify-between ">

                    <span className="text-sm text-muted-foreground pb-2">
                      {paper.downloads} downloads
                    </span>

                    <div className="space-x-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleDownload(paper._id)
                      }
                    >
                      Download
                    </Button>

                    <Button
                    variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleDelete(paper._id)
                      }
                    >
                      Delete
                    </Button>

                    <Button
                    variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleApprove(paper._id)
                      }
                    >
                      Approve
                    </Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </>
  )
}