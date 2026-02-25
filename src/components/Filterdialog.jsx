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
        <Button variant="outline">Filters</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Filter Papers</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">

          <Select onValueChange={setDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
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

        </div>

        <DialogFooter>
          <Button onClick={handleApply}>Apply</Button>
          <Button onClick={handleReset}>Reset Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}