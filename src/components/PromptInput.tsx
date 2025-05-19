
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Laptop, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function PromptInput() {
  const [prompt, setPrompt] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted prompt:", prompt);
    // We'd process the prompt here in a real app
    setPrompt("");
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="glass-panel rounded-xl overflow-hidden">
        <h2 className="text-2xl font-semibold text-center py-6">What are we coding next?</h2>
        
        <form onSubmit={handleSubmit} className="px-6 pb-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 p-4 rounded-lg bg-muted/50 border border-border/50 placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent resize-none"
              placeholder="Describe a task..."
            />
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Laptop className="h-4 w-4" />
                    main/codebot-app
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>main/codebot-app</DropdownMenuItem>
                  <DropdownMenuItem>dev/codebot-backend</DropdownMenuItem>
                  <DropdownMenuItem>feature/dark-mode</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    main
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>main</DropdownMenuItem>
                  <DropdownMenuItem>develop</DropdownMenuItem>
                  <DropdownMenuItem>feature/new-ui</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">Ask</Button>
              <Button type="submit" size="sm">Code</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
