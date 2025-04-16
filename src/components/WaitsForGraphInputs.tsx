
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { detectDeadlockRAG, createGraphData, parseWaitsForGraph } from '@/utils/deadlockUtils';
import GraphVisualization from './GraphVisualization';
import ResultDisplay from './ResultDisplay';
import { useToast } from '@/components/ui/use-toast';

interface WaitsForGraphInputsProps {
  processes: number;
}

const WaitsForGraphInputs: React.FC<WaitsForGraphInputsProps> = ({ processes }) => {
  const [waitsForInputs, setWaitsForInputs] = useState<string[]>(Array(processes).fill(''));
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [deadlockResult, setDeadlockResult] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...waitsForInputs];
    newInputs[index] = value;
    setWaitsForInputs(newInputs);
  };

  const handleCheckDeadlock = () => {
    try {
      // Parse the waits-for graph data
      const graph = parseWaitsForGraph(waitsForInputs);
      
      // Create graph visualization data
      const visualData = createGraphData(graph, processes);
      setGraphData(visualData);
      
      // Detect deadlock
      const hasDeadlock = detectDeadlockRAG(graph, processes);
      setDeadlockResult(hasDeadlock);
    } catch (error) {
      toast({
        title: "Error Checking Deadlock",
        description: `${error}`,
        variant: "destructive"
      });
      console.error(error);
    }
  };

  return (
    <Card className="border border-os-primary/20 bg-os-card mb-6 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-os-text">Waits-For Graph Deadlock Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Array.from({ length: processes }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Label htmlFor={`process-${i}`} className="text-sm text-os-text/80">
                Process P{i} waits for (space-separated process indices):
              </Label>
              <Input
                id={`process-${i}`}
                value={waitsForInputs[i]}
                onChange={(e) => handleInputChange(i, e.target.value)}
                placeholder="e.g. 1 3 (leave empty if none)"
                className="bg-muted text-os-text"
              />
            </div>
          ))}
          
          <Button 
            onClick={handleCheckDeadlock}
            className="mt-2 bg-os-primary hover:bg-os-primary/80 text-white"
          >
            Check for Deadlock
          </Button>
          
          {graphData.nodes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md font-medium mb-2 text-os-text">Waits-For Graph Visualization:</h3>
              <GraphVisualization data={graphData} />
            </div>
          )}
          
          {deadlockResult !== null && (
            <ResultDisplay isDeadlock={deadlockResult} algorithm="rag" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WaitsForGraphInputs;
