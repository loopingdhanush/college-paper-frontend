import { useEffect, useState } from "react"
import api from "@/lib/api"
import { useSearchParams } from "react-router-dom";

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Trash2, FileText } from "lucide-react"


import FilterDialog from "@/components/Filterdialog"

export default function allcourses({admin}) {
  const [searchParams] = useSearchParams();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const subject = searchParams.get("subject");
  const [filters, setFilters] = useState(subject?{subject}:{});
  const [downloadingId, setDownloadingId] = useState(null);
  
  // Fetch papers
  const fetchPapers = async () => {
    try {
      setLoading(true)
      console.log(filters)
      const query = new URLSearchParams(filters).toString()

      const res = await api.get(
        `papers/${query ? `?${query}` : ""}`
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
      const id = paper._id;
      setDownloadingId(id); // 👈 start loading
  
      const res = await api.get(`/papers/${id}/download`);
      const fileURL = res.data.fileURL;
  
      const fileResponse = await fetch(fileURL);
      const blob = await fileResponse.blob();
  
      const fileName =
        `${paper.department}_${paper.subject}_${paper.type}_${paper.year}`
          .replace(/\s+/g, "_")
          .toUpperCase() + ".pdf";
  
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName);
  
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
  
    } catch (error) {
      console.error(error);
    } finally {
      setDownloadingId(null); // 👈 stop loading
    }
  };

const handleDelete = async (id) =>{
  try {
    const res = await api.delete(`papers/${id}`)
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
    <span className="font-semibold text-sm tracking-tight">Question Bank</span>
  </div>

  <div className="px-6 md:px-10 py-8 md:py-10 max-w-7xl mx-auto space-y-7">

    {/* Header */}
    <div className="hidden md:block space-y-1">
      <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Academic Resources</p>
      <h1 className="text-2xl font-semibold tracking-tight">Question Bank</h1>
      <p className="text-sm text-muted-foreground">Browse, filter, and download academic papers.</p>
    </div>

    <Separator className="hidden md:block" />

    {/* Toolbar */}
    <div className="flex items-center justify-between">
      <FilterDialog onApply={(data) => setFilters(data)} />
      {!loading && papers.length > 0 && (
        <p className="text-xs text-muted-foreground">{papers.length} paper{papers.length !== 1 ? "s" : ""}</p>
      )}
    </div>

    {/* States */}
    {loading ? (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="pt-5 pb-4 px-5 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3.5 w-1/2" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-10 rounded-full" />
              </div>
            </CardContent>
            <CardFooter className="px-5 py-3 border-t bg-muted/30">
              <Skeleton className="h-7 w-24 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    ) : papers.length === 0 ? (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="rounded-lg border border-dashed p-3">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">No papers found</p>
            <p className="text-xs text-muted-foreground mt-0.5">Try adjusting your filters.</p>
          </div>
        </CardContent>
      </Card>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <Card key={paper._id} className="group flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200 py-0">

            {/* Body */}
            <CardContent className="flex-1 pt-5 px-5 space-y-3">

              {/* Subject */}
              <p className="font-medium text-sm leading-snug line-clamp-2">
                {paper.subject}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-[11px] px-2 rounded-full font-normal">
                  {paper.department}
                </Badge>
                <Badge variant="outline" className="text-[11px] px-2 rounded-full font-normal">
                  {paper.type}
                </Badge>
                <Badge variant="outline" className="text-[11px] px-2 rounded-full font-normal tabular-nums">
                  {paper.year}
                </Badge>
              </div>

            </CardContent>

            {/* Footer */}
            <CardFooter className="px-5 py-3 bg-gray-100 flex items-center justify-between gap-2">

              <span className="text-[11px] text-muted-foreground ">
                {paper.downloads.toLocaleString()} downloads
              </span>

              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2.5 text-xs gap-1.5"
                  onClick={() => handleDownload(paper)}
                  disabled={downloadingId === paper._id}
                >
                  {downloadingId === paper._id ? (
                    <>
                      <span className="h-3 w-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-3 w-3" />
                      Download
                    </>
                  )}
                </Button>

                {admin && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(paper._id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </CardFooter>

          </Card>
        ))}
      </div>
    )}

  </div>
</>
  )
}