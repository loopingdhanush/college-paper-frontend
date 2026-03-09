import { useState } from "react"
import api from "@/lib/api"
import { useNavigate } from "react-router-dom"

import { SidebarMenuButton } from "./ui/sidebar"

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
    <Dialog open={open} onOpenChange={setOpen} className="mb-2">
      <DialogTrigger asChild>
        <SidebarMenuButton>
        <img width="22" height="22" src="https://img.icons8.com/material/24/circled-up--v1.png" alt="circled-up--v1"/>Upload
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Upload Paper</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          <Select onValueChange={setDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="CSE">CSE</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setYear}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA1">CA1</SelectItem>
              <SelectItem value="CA2">CA2</SelectItem>
              <SelectItem value="Tutorial">Tutorial</SelectItem>
              <SelectItem value="Practice">Practice</SelectItem>
              <SelectItem value="Semester">Semester</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

        </div>

        <DialogFooter>
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}