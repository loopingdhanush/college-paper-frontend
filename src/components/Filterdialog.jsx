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

export default function FilterDialog({ onApply }) {
  const [open, setOpen] = useState(false)
  const [department, setDepartment] = useState("")
  const [year, setYear] = useState("")
  const [type, setType] = useState("")

  const handleApply = () => {
    const filters = { department, year, type }
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
              <SelectItem value="SEMESTER">SEMESTER</SelectItem>
            </SelectContent>
          </Select>

        </div>

        <DialogFooter>
          <Button onClick={handleApply}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}