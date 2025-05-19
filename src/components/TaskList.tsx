
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  time: string;
  repository: string;
  status: 'pending' | 'completed' | 'merged' | 'open' | 'failed';
  additions?: number;
  deletions?: number;
}

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Add dark mode toggle and theme preferences",
    time: "Just now",
    repository: "main/codebot-app",
    status: "pending",
  },
  {
    id: "task-2",
    title: "Implement responsive sidebar navigation",
    time: "5 min ago",
    repository: "main/codebot-app",
    status: "open",
    additions: 128,
    deletions: 32
  },
  {
    id: "task-3",
    title: "Fix responsive layout issues on mobile view",
    time: "15 min ago",
    repository: "main/codebot-app",
    status: "merged",
    additions: 64,
    deletions: 12
  },
  {
    id: "task-4",
    title: "Create API endpoints for user authentication",
    time: "28 min ago",
    repository: "dev/codebot-backend",
    status: "merged",
    additions: 210,
    deletions: 43
  },
  {
    id: "task-5",
    title: "Implement WebSocket connection for real-time updates",
    time: "36 min ago",
    repository: "dev/codebot-backend",
    status: "failed"
  },
  {
    id: "task-6",
    title: "Add unit tests for AuthService",
    time: "42 min ago",
    repository: "dev/codebot-backend",
    status: "completed",
    additions: 184,
    deletions: 0
  },
];

interface TaskListProps {
  onTaskSelect: (task: Task) => void;
}

export function TaskList({ onTaskSelect }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'archive'>('all');
  
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task.id);
    onTaskSelect(task);
  };
  
  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <div className="animated-text text-blue-400">Working on your task...</div>;
      case 'completed':
        return <div className="text-green-400">+{Math.floor(Math.random() * 50) + 50} -0</div>;
      case 'merged':
        return (
          <div className="flex items-center">
            <span className="mr-2 px-1.5 py-0.5 rounded text-xs bg-purple-900/50 text-purple-300">Merged</span>
            <span className="text-green-400">+{Math.floor(Math.random() * 100) + 100}</span>
            <span className="mx-1">-</span>
            <span className="text-red-400">{Math.floor(Math.random() * 50)}</span>
          </div>
        );
      case 'open':
        return (
          <div className="flex items-center">
            <span className="mr-2 px-1.5 py-0.5 rounded text-xs bg-green-900/50 text-green-300">Open</span>
            <span className="text-green-400">+{Math.floor(Math.random() * 100) + 50}</span>
            <span className="mx-1">-</span>
            <span className="text-red-400">{Math.floor(Math.random() * 40)}</span>
          </div>
        );
      case 'failed':
        return <div className="text-red-400">Failed</div>;
    }
  };
  
  return (
    <div className="mb-8">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 w-48">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>Tasks</TabsTrigger>
          <TabsTrigger value="archive" onClick={() => setFilter('archive')}>Archive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-2">
          {mockTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "glass-panel rounded-lg p-4 cursor-pointer transition-colors",
                selectedTask === task.id ? "border-accent/50 bg-accent/5" : "hover:bg-muted/20"
              )}
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {task.time} · {task.repository}
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  {getStatusBadge(task.status)}
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="archive" className="h-64 flex items-center justify-center">
          <div className="text-muted-foreground">No archived tasks</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
