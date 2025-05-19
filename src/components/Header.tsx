
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Bell } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <svg className="size-8 mr-1" width="28" height="28" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5756 33.7008L4.9046 21.2922L10.6192 19.02C21.4449 14.7157 33.6498 15.637 43.7066 21.5178V21.5178L45.0603 23.7076V23.7076C35.5622 21.3118 25.4901 23.473 17.811 29.5545L12.5756 33.7008Z" fill="white"></path>
            <path d="M26.719 37.2522L21.1639 31.2229L24.0749 29.3602C29.5896 25.8314 36.4221 25.0391 42.598 27.2123V27.2123L43.5783 28.2763V28.2763C38.0821 27.9665 32.7549 30.2324 29.1659 34.4064L26.719 37.2522Z" fill="#777777"></path>
          </svg>
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              codebot
            </h1>
            <div className="flex items-center text-xs text-muted-foreground">
              by <span className="mx-1">Chutes</span> and 
              <img 
                src="https://www.levangielaboratories.com/_next/image?url=%2Fassets%2Flogo1(revised).png&w=48&q=75&dpl=dpl_9yJ2qMme2y3dWREKyRk8hUiX1Sau" 
                alt="LLABS Logo" 
                className="h-3 w-auto mx-1" 
              />
              LLABS
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="link" className="text-muted-foreground">Environments</Button>
        <Button variant="link" className="text-muted-foreground">Docs</Button>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            )}
          </Button>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>API Keys</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="ml-2 h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
          R
        </div>
      </div>
    </header>
  );
}
