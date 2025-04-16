
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface InitialSetupProps {
  onSetup: (processes: number, resources: number) => void;
}

const InitialSetup: React.FC<InitialSetupProps> = ({ onSetup }) => {
  const [processes, setProcesses] = useState<string>('');
  const [resources, setResources] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = () => {
    const processesNum = parseInt(processes);
    const resourcesNum = parseInt(resources);

    if (isNaN(processesNum) || isNaN(resourcesNum) || processesNum <= 0 || resourcesNum <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for processes and resources.",
        variant: "destructive"
      });
      return;
    }

    if (processesNum > 10 || resourcesNum > 10) {
      toast({
        title: "Input Limit Exceeded",
        description: "For better visualization, please limit processes and resources to 10 each.",
        variant: "destructive"
      });
      return;
    }

    onSetup(processesNum, resourcesNum);
  };

  return (
    <div className="bg-os-card p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8 border border-os-primary/20 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6 text-os-text">Initial Setup</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="processes">Number of Processes</Label>
          <Input
            id="processes"
            type="number"
            min="1"
            max="10"
            value={processes}
            onChange={(e) => setProcesses(e.target.value)}
            placeholder="Enter number of processes"
            className="bg-muted text-os-text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resources">Number of Resources</Label>
          <Input
            id="resources"
            type="number"
            min="1"
            max="10"
            value={resources}
            onChange={(e) => setResources(e.target.value)}
            placeholder="Enter number of resources"
            className="bg-muted text-os-text"
          />
        </div>
        <Button 
          onClick={handleSubmit} 
          className="w-full mt-4 bg-os-primary hover:bg-os-primary/80 text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default InitialSetup;
