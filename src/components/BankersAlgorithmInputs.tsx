
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { isSafeStateBanker, parseMatrix, parseArray } from '@/utils/deadlockUtils';
import ResultDisplay from './ResultDisplay';
import { useToast } from '@/components/ui/use-toast';

interface BankersAlgorithmInputsProps {
  processes: number;
  resources: number;
}

const BankersAlgorithmInputs: React.FC<BankersAlgorithmInputsProps> = ({ processes, resources }) => {
  const [availableResources, setAvailableResources] = useState<string>('');
  const [maxNeeds, setMaxNeeds] = useState<string[]>(Array(processes).fill(''));
  const [allocations, setAllocations] = useState<string[]>(Array(processes).fill(''));
  const [safetyResult, setSafetyResult] = useState<{ isSafe: boolean; sequence: number[] } | null>(null);
  const { toast } = useToast();

  const handleMaxNeedChange = (index: number, value: string) => {
    const newMaxNeeds = [...maxNeeds];
    newMaxNeeds[index] = value;
    setMaxNeeds(newMaxNeeds);
  };

  const handleAllocationChange = (index: number, value: string) => {
    const newAllocations = [...allocations];
    newAllocations[index] = value;
    setAllocations(newAllocations);
  };

  const handleCheckSafeState = () => {
    try {
      // Parse the input data
      const available = parseArray(availableResources);
      
      if (available.length !== resources) {
        throw new Error(`Expected ${resources} available resources, got ${available.length}`);
      }
      
      const maxMatrix = parseMatrix(maxNeeds, resources);
      const allocMatrix = parseMatrix(allocations, resources);
      
      // Check if resources are valid
      for (let i = 0; i < processes; i++) {
        for (let j = 0; j < resources; j++) {
          if (allocMatrix[i][j] > maxMatrix[i][j]) {
            throw new Error(`Allocation for P${i} exceeds maximum need for resource ${j}`);
          }
        }
      }
      
      // Run Banker's algorithm
      const [isSafe, safeSequence] = isSafeStateBanker(available, maxMatrix, allocMatrix, processes, resources);
      setSafetyResult({ isSafe, sequence: safeSequence });
    } catch (error) {
      toast({
        title: "Error Checking Safe State",
        description: `${error}`,
        variant: "destructive"
      });
      console.error(error);
    }
  };

  return (
    <Card className="border border-os-primary/20 bg-os-card animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-os-text">Banker's Algorithm Safety Check</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-1">
            <Label htmlFor="available" className="text-sm text-os-text/80">
              Available Resources (space-separated values):
            </Label>
            <Input
              id="available"
              value={availableResources}
              onChange={(e) => setAvailableResources(e.target.value)}
              placeholder={`e.g. ${Array(resources).fill('3').join(' ')}`}
              className="bg-muted text-os-text"
            />
            <p className="text-xs text-os-text/60">Enter {resources} values</p>
          </div>
          
          <div className="space-y-2 mt-2">
            <h3 className="text-md font-medium text-os-text">Maximum Resource Needs:</h3>
            {Array.from({ length: processes }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Label htmlFor={`max-${i}`} className="text-sm text-os-text/80">
                  Process P{i} Max Needs:
                </Label>
                <Input
                  id={`max-${i}`}
                  value={maxNeeds[i]}
                  onChange={(e) => handleMaxNeedChange(i, e.target.value)}
                  placeholder={`e.g. ${Array(resources).fill('7').join(' ')}`}
                  className="bg-muted text-os-text"
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-2 mt-2">
            <h3 className="text-md font-medium text-os-text">Current Allocations:</h3>
            {Array.from({ length: processes }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Label htmlFor={`allocation-${i}`} className="text-sm text-os-text/80">
                  Process P{i} Allocation:
                </Label>
                <Input
                  id={`allocation-${i}`}
                  value={allocations[i]}
                  onChange={(e) => handleAllocationChange(i, e.target.value)}
                  placeholder={`e.g. ${Array(resources).fill('1').join(' ')}`}
                  className="bg-muted text-os-text"
                />
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleCheckSafeState}
            className="mt-2 bg-os-primary hover:bg-os-primary/80 text-white"
          >
            Check Safe State
          </Button>
          
          {safetyResult !== null && (
            <ResultDisplay 
              isDeadlock={safetyResult.isSafe} 
              algorithm="banker" 
              safeSequence={safetyResult.isSafe ? safetyResult.sequence : undefined} 
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BankersAlgorithmInputs;
