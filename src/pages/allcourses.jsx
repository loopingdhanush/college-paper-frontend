import { useEffect, useState } from "react"
import api from "@/lib/api"
import { useSearchParams } from "react-router-dom";

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


import FilterDialog from "@/components/Filterdialog"

export default function allcourses({admin}) {
  const [searchParams] = useSearchParams();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const subject = searchParams.get("subject");
  const [filters, setFilters] = useState(subject?{subject}:{});
  


  // 🔄 Fetch papers
  const fetchPapers = async () => {
    try {
      setLoading(true)
      console.log(filters)
      const query = new URLSearchParams(filters).toString()

      const res = await api.get(
        `/papers/${query ? `?${query}` : ""}`
      )
      console.log(res.data)
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

  const handleDownload = async (paper) => {
  try {

    
    const id = (paper._id)
    const res = await api.get(`/papers/download/${id}`)
    
    const fileURL = res.data.fileURL

    
    const fileResponse = await fetch(fileURL)

    const blob = await fileResponse.blob()

    
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    const fileName = `${paper.subject.replace(/\s+/g, "_").toUpperCase()}_${paper.type.toUpperCase()}_${paper.year}.pdf`;
    link.download = fileName;

    document.body.appendChild(link)
    link.click()

    link.remove()
    window.URL.revokeObjectURL(url)

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
                    <Badge >
                      {paper.department}
                    </Badge>
                    <Badge>
                      {paper.type}
                    </Badge>
                    <Badge>
                      {paper.year}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-4">

                    <span className="text-sm text-muted-foreground">
                      {paper.downloads} downloads
                    </span>

                    <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        handleDownload(paper)
                      }
                    >
                      Download
                    </Button>
                    
                    {admin && (
                    <Button
                    variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleDelete(paper._id)
                      }
                    >
                      Delete
                    </Button>)}

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