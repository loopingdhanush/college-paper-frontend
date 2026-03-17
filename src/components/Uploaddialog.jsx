import { useState } from "react"
import api from "@/lib/api"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { Upload, FileUp, Loader2 } from "lucide-react"

export default function UploadDialog() {
  const navigate = useNavigate()

  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")
  const [type, setType] = useState("")
  const [subject, setSubject] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleUpload = async () => {
    if (!file || !department || !year || !type || !subject) {
      alert("Please fill all fields")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("department", department)
      formData.append("year", year)
      formData.append("type", type)
      formData.append("subject", subject)
      formData.append("file", file)

      await api.post("/papers/", formData)

      setOpen(false)
      setDepartment("")
      setYear("")
      setType("")
      setSubject("")
      setFile(null)

      navigate("/filter")

    } catch (error) {
      console.error(error)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <SidebarMenuButton>
      <Upload className="h-4 w-4" />
      Upload
    </SidebarMenuButton>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[420px] p-0 gap-0 overflow-hidden" aria-describedby={undefined}>

    {/* Header */}
    <DialogHeader className="p-5 border-b">
      <DialogTitle className="text-sm font-semibold tracking-tight">Upload Paper</DialogTitle>
    </DialogHeader>

    {/* Fields */}
    <div className="p-5 space-y-4">

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Department</label>
        <Select onValueChange={setDepartment} value={department}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AE">Automobile</SelectItem>
            <SelectItem value="BE">Biomedical</SelectItem>
            <SelectItem value="CE">Civil</SelectItem>
            <SelectItem value="CSE">CSE</SelectItem>
            <SelectItem value="CSE_AI_ML">CSE (AI & ML)</SelectItem>
            <SelectItem value="EEE">EEE</SelectItem>
            <SelectItem value="ECE">ECE</SelectItem>
            <SelectItem value="ICE">Instrumentation and Control</SelectItem>
            <SelectItem value="ME">Mechanical</SelectItem>
            <SelectItem value="MET">Metallurgical</SelectItem>
            <SelectItem value="PE">Production</SelectItem>
            <SelectItem value="RA">Robotics</SelectItem>
            <SelectItem value="BT">Bio</SelectItem>
            <SelectItem value="FT">Fashion</SelectItem>
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="TT">Textile</SelectItem>
            <SelectItem value="ME_S">Mechanical (Sandwich)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Year</label>
        <Select onValueChange={setYear} value={year}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2024">2023</SelectItem>
            <SelectItem value="2024">2022</SelectItem>
            <SelectItem value="2024">2021</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</label>
        <Select onValueChange={setType} value={type}>
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CA1">CA1</SelectItem>
            <SelectItem value="CA2">CA2</SelectItem>
            <SelectItem value="Tutorial">Tutorial</SelectItem>
            <SelectItem value="Practice">Practice</SelectItem>
            <SelectItem value="Semester">Semester</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subject</label>
        <Input
          className="text-sm"
          placeholder="e.g. Data Structures"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">File</label>
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
          <FileUp className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {file ? file.name : "Click to select a PDF"}
          </span>
          <span className="text-xs text-muted-foreground/60">PDF only</span>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </div>

    </div>

    {/* Footer */}
    <DialogFooter className="p-5 pt-0">
      <Button
        className="w-full gap-2"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            Upload Paper
          </>
        )}
      </Button>
    </DialogFooter>

  </DialogContent>
</Dialog>
  )
}