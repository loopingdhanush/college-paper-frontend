import { useEffect, useState } from "react"
import api from "@/lib/api"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import UploadDialog from "@/components/Uploaddialog"
import FilterDialog from "@/components/Filterdialog"

export default function QuestionBank() {

  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})

  // 🔄 Fetch papers
  const fetchPapers = async () => {
    try {
      setLoading(true)

      const query = new URLSearchParams(filters).toString()

      const res = await api.get(
        `/papers/approved${query ? `?${query}` : ""}`
      )

      setPapers(res.data)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPapers()
  }, [filters])

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/papers/download/${id}`)
      window.open(res.data.fileURL, "_blank")
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
        <h2 className="text-lg font-semibold">Question Bank</h2>
      </div>

      <div className="px-10 py-8 space-y-8">

        {/* Desktop Title */}
        <h1 className="text-3xl font-bold tracking-tight hidden md:block">
          Question Bank
        </h1>

        <p className="text-muted-foreground">
          Browse, filter, and download academic papers.
        </p>

        {/* Filter + Upload Row */}
        <div className="flex justify-between items-center">

          <FilterDialog
            onApply={(data) => setFilters(data)}
          />

          <UploadDialog
            onSuccess={fetchPapers}
          />

        </div>

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {papers.map((paper) => (
              <Card
                key={paper._id}
                className="hover:shadow-lg transition"
              >
                <CardContent className="p-6 space-y-4">

                  <div>
                    <h3 className="font-semibold text-lg">
                      {paper.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {paper.year}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">
                      {paper.department}
                    </Badge>
                    <Badge>
                      {paper.type}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-muted-foreground">
                      {paper.downloads} downloads
                    </span>

                    <Button
                      size="sm"
                      onClick={() =>
                        handleDownload(paper._id)
                      }
                    >
                      Download
                    </Button>
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