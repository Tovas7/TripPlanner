"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Expense {
  category: string
  amount: number
  currency: string
}

interface TripExpensesProps {
  expenses: Expense[]
  totalExpenses: string
}

export function TripExpenses({ expenses, totalExpenses }: TripExpensesProps) {
  const [showAddExpense, setShowAddExpense] = useState(false)

  // Calculate total amount
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Calculate percentages for each category
  const expensesWithPercentage = expenses.map((expense) => ({
    ...expense,
    percentage: Math.round((expense.amount / total) * 100),
  }))

  // Sort expenses by amount (descending)
  const sortedExpenses = [...expensesWithPercentage].sort((a, b) => b.amount - a.amount)

  // Generate random colors for the chart
  const categoryColors = {
    Accommodation: "bg-blue-500",
    Transportation: "bg-green-500",
    "Food & Dining": "bg-yellow-500",
    "Activities & Tours": "bg-purple-500",
    Shopping: "bg-pink-500",
    Other: "bg-gray-500",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trip Expenses</h2>
        <Button onClick={() => setShowAddExpense(!showAddExpense)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>How your budget was allocated across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedExpenses.map((expense) => (
                <div key={expense.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{expense.category}</span>
                    <span>
                      {expense.currency} {expense.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={expense.percentage}
                      className="h-2"
                      indicatorClassName={
                        categoryColors[expense.category as keyof typeof categoryColors] || "bg-primary"
                      }
                    />
                    <span className="text-xs text-muted-foreground w-10 text-right">{expense.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Total expenses for this trip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-3xl font-bold mb-2">{totalExpenses}</div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold">{expenses.length}</div>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold">
                  {expenses[0]?.currency} {Math.round(total / expenses.length).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Avg per Category</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Categories Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${color}`}></div>
            <span className="text-sm">{category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
