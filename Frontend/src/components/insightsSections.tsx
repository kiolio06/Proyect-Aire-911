import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../@/components/ui/card"

const insights = [
  { title: "Creativity Boost", description: "Try taking a different route to work today to stimulate new neural pathways." },
  { title: "Emotional Check-in", description: "Reflect on a challenging emotion you felt recently. How did you handle it?" },
  { title: "Mindfulness Moment", description: "Take three deep breaths and focus on the present moment whenever you feel stressed." },
]

export default function InsightsSection() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Daily Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}