import { useEffect, useState } from "react"
import api from "@/lib/api"
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



export default function QuestionBank({admin}) {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)


  // 🔄 Fetch papers
  const fetchPapers = async () => {
    try {
      setLoading(true)
      const res = await api.get("papers/allcourses")
      setPapers(res.data.subjects)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPapers()
    
  },[])

  const handleView = (subject) =>{
    navigate(`/filter?subject=${subject}`);
  };


  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center gap-4 border-b px-6 py-4 md:hidden">
        <SidebarTrigger className="h-9 w-9 rounded-lg border bg-background shadow-sm hover:bg-accent transition" />
        <h2 className="text-lg font-semibold">Courses</h2>
      </div>

      <div className="px-10 py-8 space-y-8">

        {/* Desktop Title */}
        <h1 className="text-3xl font-bold tracking-tight hidden md:block">
          Courses
        </h1>

        <p className="text-muted-foreground">
          Browse, filter, and download academic papers.
        </p>

        {/* Filter + Upload Row */}
        <div className="flex justify-between items-center">
          

        </div>

        {/* Papers Grid */}
        {loading ? (
          <div className="text-muted-foreground">
            Loading Courses...
          </div>
        ) : papers.length === 0 ? (
          <div className="text-muted-foreground">
            No Courses found.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {papers.map((paper) => (
              <Card
                key={paper}
                className="hover:shadow-lg transition duration-200"
              >
                <CardContent className="flex items-center justify-between ">

                  {/* Subject Name */}
                  <h3 className="font-semibold text-md">
                    {paper}
                  </h3>

                  {/* View Button */}
                  <Button
                    variant="outline"
                    size="sm"
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