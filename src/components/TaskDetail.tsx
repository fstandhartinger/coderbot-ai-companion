
import { useState } from "react";
import { Task } from "./TaskList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, File, FileCode, Image, CheckCircle, XCircle } from "lucide-react";

interface TaskDetailProps {
  task: Task | null;
  onBack: () => void;
}

export function TaskDetail({ task, onBack }: TaskDetailProps) {
  const [activeTab, setActiveTab] = useState("summary");
  
  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
        <p>Select a task to view details</p>
      </div>
    );
  }
  
  // Mock history items
  const historyItems = [
    { time: "0:05", action: "Analyzing requirements" },
    { time: "0:12", action: "Checking existing code structure" },
    { time: "0:18", action: "Planning implementation" },
    { time: "0:25", action: "Writing code" },
    { time: "0:42", action: "Testing implementation" },
    { time: "0:48", action: "Finalizing changes" },
  ];
  
  // Mock file changes
  const fileChanges = [
    { name: "src/components/Header.tsx", additions: 28, deletions: 15 },
    { name: "src/components/ThemeToggle.tsx", additions: 42, deletions: 0 },
    { name: "src/contexts/ThemeContext.tsx", additions: 35, deletions: 0 },
    { name: "src/hooks/useTheme.ts", additions: 22, deletions: 0 },
    { name: "tailwind.config.ts", additions: 12, deletions: 3 },
  ];
  
  // Mock test results
  const testResults = [
    { name: "ThemeContext renders correctly", status: "passed" },
    { name: "useTheme hook returns expected values", status: "passed" },
    { name: "ThemeToggle changes theme when clicked", status: "passed" },
    { name: "Theme persists after page reload", status: "failed" },
    { name: "Color scheme matches design specifications", status: "passed" },
  ];
  
  return (
    <div className="bg-muted/10 rounded-xl border border-border/40 overflow-hidden">
      <div className="flex border-b border-border/40 p-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-lg font-medium">{task.title}</h2>
          <div className="text-sm text-muted-foreground">
            {task.time} · {task.repository}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 h-[calc(100vh-320px)] min-h-[500px]">
        <div className="col-span-1 border-r border-border/40 p-4 overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wide text-muted-foreground font-medium mb-2">Progress</h3>
            <div className="space-y-3">
              {historyItems.map((item, index) => (
                <div key={index} className="flex">
                  <div className="w-12 text-sm text-muted-foreground">{item.time}</div>
                  <div className="flex-1 text-sm">
                    {index === historyItems.length - 1 ? (
                      <span className="animated-text">{item.action}...</span>
                    ) : (
                      item.action
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wide text-muted-foreground font-medium mb-2">Summary</h3>
            <ul className="list-disc list-inside space-y-2 text-sm pl-1">
              <li>Added dark mode toggle component to the header</li>
              <li>Created ThemeContext for application-wide theme management</li>
              <li>Implemented useTheme hook for convenient theme access</li>
              <li>Updated styling for dark/light theme compatibility</li>
              <li>Added local storage persistence for theme preference</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wide text-muted-foreground font-medium mb-2">Testing</h3>
            <div className="space-y-2">
              {testResults.map((test, index) => (
                <div key={index} className="flex items-center text-sm">
                  {test.status === "passed" ? (
                    <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 mr-2" />
                  )}
                  {test.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-span-2 p-4 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 w-auto">
              <TabsTrigger value="summary">Code Changes</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="output">Terminal Output</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary">
              <div className="space-y-3">
                {fileChanges.map((file, index) => (
                  <div key={index} className="glass-panel rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {file.name.endsWith(".tsx") ? (
                          <FileCode className="h-4 w-4 mr-2" />
                        ) : (
                          <File className="h-4 w-4 mr-2" />
                        )}
                        <span className="font-mono text-sm">{file.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-400">+{file.additions}</span>
                        <span className="mx-1">-</span>
                        <span className="text-red-400">{file.deletions}</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded p-3 font-mono text-xs">
                      {file.name === "src/components/ThemeToggle.tsx" ? (
                        <pre>{`import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-muted-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-200" />
      )}
    </Button>
  );
}`}</pre>
                      ) : (
                        <div className="text-muted-foreground italic">Click to view file changes</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="glass-panel rounded-lg p-4 flex flex-col items-center">
                <div className="flex items-center justify-center mb-4">
                  <Image className="h-5 w-5 mr-2" />
                  <span>Preview of changes</span>
                </div>
                
                <div className="border border-border/40 rounded-lg w-full max-w-md overflow-hidden">
                  <div className="bg-muted/30 p-2 flex justify-between items-center border-b border-border/40">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs">codebot-app</div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-accent"></div>
                        <span>CodeBot</span>
                      </div>
                      <Button size="icon" variant="ghost">
                        <Moon className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="h-12 w-full rounded-md bg-muted/20 mb-3"></div>
                    <div className="h-12 w-full rounded-md bg-muted/20 mb-3"></div>
                    <div className="h-12 w-3/4 rounded-md bg-muted/20"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="output">
              <div className="glass-panel rounded-lg p-4">
                <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
{`> codebot-app@0.1.0 build
> vite build

vite v5.2.6 building for production...
✓ 342 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html               0.75 kB │ gzip: 0.44 kB
dist/assets/index-DheHfVEw.css  15.55 kB │ gzip: 3.14 kB
dist/assets/index-CtKmOdm1.js     143.17 kB │ gzip: 49.87 kB
✓ built in 934ms

> codebot-app@0.1.0 preview
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: http://192.168.1.5:4173/`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
