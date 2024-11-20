import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/Label";

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [goals, setGoals] = useState([]);
    const [sessionLength, setSessionLength] = useState('');
    const navigate = useNavigate(); // Usa useNavigate para redirigir

    const handleGoalChange = (goal) => {
      setGoals(prev => 
        prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
      );
    };

    const handleNext = () => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        localStorage.setItem('userPreferences', JSON.stringify({ goals, sessionLength }));
        // Redirige al usuario al dashboard cuando llega al paso final
        navigate('/dashboard');
      }
    };
    

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-teal-100">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Let's Get Started</CardTitle>
            <CardDescription>Customize your MindTrain experience</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="grid gap-4">
                <Label>What are your mental training goals?</Label>
                {['Creativity', 'Emotional Intelligence', 'Inner Well-being', 'Imagination', 'Vision'].map((goal) => (
                  <div className="flex items-center space-x-2" key={goal}>
                    <Checkbox id={goal} checked={goals.includes(goal)} onCheckedChange={() => handleGoalChange(goal)} />
                    <Label htmlFor={goal}>{goal}</Label>
                  </div>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-4">
                <Label>Choose your preferred daily session length:</Label>
                <RadioGroup value={sessionLength} onValueChange={setSessionLength}>
                  {[10, 15, 20, 30].map((length) => (
                    <div className="flex items-center space-x-2" key={length}>
                      <RadioGroupItem value={length.toString()} id={`length-${length}`} />
                      <Label htmlFor={`length-${length}`}>{length} minutes</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            {step === 3 && (
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold">Welcome to MindTrain!</h3>
                <p>Here's what you can expect:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Daily personalized mental training sessions</li>
                  <li>Track your progress and insights</li>
                  <li>Improve your mental well-being over time</li>
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleNext} className="w-full">
              {step < 3 ? 'Next' : 'Get Started'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
}