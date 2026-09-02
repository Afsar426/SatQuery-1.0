import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ValidationDetailDrawer } from './ValidationDetailDrawer';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-[#171817] text-[#F1EBDD] overflow-hidden select-none font-sans">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#171817]">
        <Topbar />
        <main className="flex-1 overflow-y-auto relative bg-[#171817]">
          {children}
        </main>
      </div>

      {/* Global Slide-out Validation Drawer */}
      <ValidationDetailDrawer />
    </div>
  );
};
