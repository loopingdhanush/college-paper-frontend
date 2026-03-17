import { useEffect, useState } from "react"
import api from "@/lib/api"
import { useNavigate } from "react-router-dom";

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen } from "lucide-react"

export default function Questionbank({admin}) {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)


  // Fetch courses
  const fetchCourses = async () => {
    try {
      setLoading(true)
      const res = await api.get("papers/courses")
      setPapers(res.data.subjects)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
    
  },[])

  const handleView = (subject) =>{
    navigate(`/filter/?subject=${subject}`);
  };


  return (
    <>
  {/* Mobile Header */}
  <div className="flex items-center gap-3 border-b px-5 py-3.5 md:hidden sticky top-0 bg-background/95 backdrop-blur z-10">
    <SidebarTrigger className="h-8 w-8 rounded-md border shadow-sm" />
    <span className="font-semibold text-sm tracking-tight">Courses</span>
  </div>

  <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">

    {/* Header */}
    <div className="hidden md:block space-y-1">
      <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Academic</p>
      <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>
      <p className="text-sm text-muted-foreground">Browse and view your enrolled courses.</p>
    </div>

    <Separator className="hidden md:block" />

    {/* Count */}
    {!loading && papers.length > 0 && (
      <p className="text-xs text-muted-foreground">{papers.length} course{papers.length !== 1 ? "s" : ""}</p>
    )}

    {/* States */}
    {loading ? (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between p-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-8 w-14 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    ) : papers.length === 0 ? (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-3 p-6">
          <div className="rounded-lg border border-dashed p-3">
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">No courses found</p>
            <p className="text-xs text-muted-foreground mt-0.5">You have no courses available right now.</p>
          </div>
        </CardContent>
      </Card>
    ) : (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <Card
            key={paper}
            className="group hover:shadow-md transition-shadow duration-200 py-0"
          >
            <CardContent className="flex items-center justify-between p-4">

              <div className="flex items-center gap-3 min-w-0">

                <div className="rounded-md bg-muted p-2 shrink-0">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="font-medium text-sm truncate">{paper}</p>
                
              </div>

              <Button
                variant="outline"
                size="sm"
                className="shrink-0 ml-3"
                onClick={() => handleView(paper)}
              >
                View
              </Button>
              
            </CardContent>
          </Card>
        ))}
      </div>
    )}

  </div>
</>
  )
}