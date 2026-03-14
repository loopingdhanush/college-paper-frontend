import { useState } from "react"

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

export default function FilterDialog({ onApply }) {
  const [open, setOpen] = useState(false)
  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")
  const [type, setType] = useState("")
  const [subject, setSubject] = useState("")

  const handleApply = () => {
    const filters = { department, year, type, subject }
    onApply?.(filters)
    setDepartment("")
    setYear("")
    setType("")
    setSubject("")
    setOpen(false)
  }

  const handleReset = () =>{
    setDepartment("")
    setYear("")
    setType("")
    setSubject("")
    const filters = { department, year, type, subject }
    onApply?.(filters)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="outline" size="sm" className="gap-2">
      
      Filters
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-[380px] p-0 gap-0 overflow-hidden" aria-describedby={undefined}>

    {/* Header */}
    <DialogHeader className="p-5 border-b">
      <DialogTitle className="text-sm font-semibold tracking-tight">Filter Papers</DialogTitle>
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
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="CSE">CSE</SelectItem>
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

    </div>

    {/* Footer */}
    <DialogFooter className="p-5 pt-4 flex gap-2">
      <Button variant="destructive" size="sm" className="flex-1" onClick={handleReset}>
        Reset
      </Button>
      <Button size="sm" className="flex-1" onClick={handleApply}>
        Apply Filters
      </Button>
    </DialogFooter>

  </DialogContent>
</Dialog>
  )
}