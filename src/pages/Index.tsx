
import { useState } from "react";
import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { TaskList, Task } from "@/components/TaskList";
import { TaskDetail } from "@/components/TaskDetail";

export default function Index() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };
  
  const handleBack = () => {
    setSelectedTask(null);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-6xl py-6 px-4">
        <PromptInput />
        
        {selectedTask ? (
          <TaskDetail task={selectedTask} onBack={handleBack} />
        ) : (
          <TaskList onTaskSelect={handleTaskSelect} />
        )}
      </main>
    </div>
  );
}
