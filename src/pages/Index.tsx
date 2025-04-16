
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InitialSetup from '@/components/InitialSetup';
import WaitsForGraphInputs from '@/components/WaitsForGraphInputs';
import BankersAlgorithmInputs from '@/components/BankersAlgorithmInputs';
import DeadlockTutorial from '@/components/DeadlockTutorial';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [setup, setSetup] = useState<{ processes: number; resources: number } | null>(null);

  const handleSetup = (processes: number, resources: number) => {
    setSetup({ processes, resources });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        {!setup ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-os-text">Operating System Deadlock Analysis</h2>
            <p className="text-center text-os-text/80 max-w-2xl mx-auto mb-8">
              This application helps detect and analyze deadlocks in operating systems using waits-for graphs 
              and the Banker's algorithm. Begin by specifying the number of processes and resources.
            </p>
            <InitialSetup onSetup={handleSetup} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-os-text">
              Deadlock Analysis ({setup.processes} Processes, {setup.resources} Resources)
            </h2>
            
            <DeadlockTutorial />
            
            <Tabs defaultValue="waitsfor" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="waitsfor">Waits-For Graph Analysis</TabsTrigger>
                <TabsTrigger value="bankers">Banker's Algorithm</TabsTrigger>
              </TabsList>
              
              <TabsContent value="waitsfor">
                <WaitsForGraphInputs processes={setup.processes} />
              </TabsContent>
              
              <TabsContent value="bankers">
                <BankersAlgorithmInputs 
                  processes={setup.processes} 
                  resources={setup.resources} 
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
