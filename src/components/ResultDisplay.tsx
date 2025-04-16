
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface DeadlockResultProps {
  isDeadlock: boolean;
  algorithm: 'rag' | 'banker';
  safeSequence?: number[];
}

const ResultDisplay: React.FC<DeadlockResultProps> = ({ 
  isDeadlock, 
  algorithm,
  safeSequence 
}) => {
  if (algorithm === 'rag') {
    return (
      <Alert className={`mt-4 ${isDeadlock ? 'border-os-warning bg-os-warning/10' : 'border-os-success bg-os-success/10'}`}>
        {isDeadlock ? (
          <>
            <AlertCircle className="h-5 w-5 text-os-warning" />
            <AlertTitle className="text-os-warning font-bold">Deadlock Detected!</AlertTitle>
            <AlertDescription className="text-os-text/90">
              A cycle was found in the waits-for graph, indicating a deadlock situation.
            </AlertDescription>
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 text-os-success" />
            <AlertTitle className="text-os-success font-bold">No Deadlock Found</AlertTitle>
            <AlertDescription className="text-os-text/90">
              No cycles were detected in the waits-for graph. The system is deadlock-free.
            </AlertDescription>
          </>
        )}
      </Alert>
    );
  } else {
    return (
      <Alert className={`mt-4 ${!isDeadlock ? 'border-os-warning bg-os-warning/10' : 'border-os-success bg-os-success/10'}`}>
        {!isDeadlock ? (
          <>
            <AlertCircle className="h-5 w-5 text-os-warning" />
            <AlertTitle className="text-os-warning font-bold">Unsafe State!</AlertTitle>
            <AlertDescription className="text-os-text/90">
              The system is in an unsafe state. Deadlock may occur.
            </AlertDescription>
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 text-os-success" />
            <AlertTitle className="text-os-success font-bold">Safe State Confirmed</AlertTitle>
            <AlertDescription className="text-os-text/90">
              The system is in a safe state and can avoid deadlock.
              {safeSequence && safeSequence.length > 0 && (
                <div className="mt-2">
                  <span className="font-semibold">Safe Sequence: </span>
                  <code className="code-font bg-muted p-1 rounded text-xs">
                    {safeSequence.map(p => `P${p}`).join(' → ')}
                  </code>
                </div>
              )}
            </AlertDescription>
          </>
        )}
      </Alert>
    );
  }
};

export default ResultDisplay;
