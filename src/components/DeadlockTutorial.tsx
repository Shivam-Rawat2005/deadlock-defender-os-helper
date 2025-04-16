
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DeadlockTutorial: React.FC = () => {
  return (
    <Card className="border border-os-primary/20 bg-os-card mb-6 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-os-text">Understanding Deadlock Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="concepts">
          <TabsList className="grid grid-cols-3 bg-muted">
            <TabsTrigger value="concepts">Concepts</TabsTrigger>
            <TabsTrigger value="waits-for">Waits-For Graph</TabsTrigger>
            <TabsTrigger value="bankers">Banker's Algorithm</TabsTrigger>
          </TabsList>
          
          <TabsContent value="concepts" className="text-os-text/90 space-y-2 pt-4">
            <p>
              <strong className="text-os-primary">Deadlock</strong> is a state in a computer system where a set of processes cannot proceed because each is waiting for a resource held by another process in the set.
            </p>
            <p>
              Four conditions must be present for a deadlock to occur:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-os-primary">Mutual Exclusion:</strong> Resources cannot be shared.</li>
              <li><strong className="text-os-primary">Hold and Wait:</strong> Processes hold resources while waiting for others.</li>
              <li><strong className="text-os-primary">No Preemption:</strong> Resources cannot be forcibly taken away.</li>
              <li><strong className="text-os-primary">Circular Wait:</strong> A circular chain of waiting processes exists.</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="waits-for" className="text-os-text/90 space-y-2 pt-4">
            <p>
              A <strong className="text-os-primary">Waits-For Graph</strong> is a directed graph used to detect deadlocks:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Each node represents a process</li>
              <li>An edge from P<sub>i</sub> to P<sub>j</sub> indicates P<sub>i</sub> is waiting for a resource held by P<sub>j</sub></li>
              <li>A cycle in the graph indicates a potential deadlock</li>
            </ul>
            <p className="mt-3">
              <strong className="text-os-primary">How to use the tool:</strong> For each process, enter the indices of other processes it is waiting for, separated by spaces. Leave empty if the process isn't waiting for any other process.
            </p>
          </TabsContent>
          
          <TabsContent value="bankers" className="text-os-text/90 space-y-2 pt-4">
            <p>
              The <strong className="text-os-primary">Banker's Algorithm</strong> is a resource allocation and deadlock avoidance algorithm that tests for safety by simulating resource allocation.
            </p>
            <p>
              It requires the following information:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-os-primary">Available Resources:</strong> Vector of available resources</li>
              <li><strong className="text-os-primary">Maximum Needs:</strong> Matrix defining maximum demand of each process</li>
              <li><strong className="text-os-primary">Allocation:</strong> Matrix showing currently allocated resources</li>
            </ul>
            <p className="mt-3">
              The algorithm determines if the system is in a <strong className="text-os-primary">safe state</strong> (where all processes can complete) or an <strong className="text-os-primary">unsafe state</strong> (where deadlock might occur).
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeadlockTutorial;
