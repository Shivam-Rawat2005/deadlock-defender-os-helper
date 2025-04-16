
import React, { useEffect, useRef } from 'react';
import { Graph } from 'react-d3-graph';

interface GraphVisualizationProps {
  data: {
    nodes: { id: string; color: string }[];
    links: { source: string; target: string }[];
  };
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ data }) => {
  // Graph configuration
  const graphConfig = {
    nodeHighlightBehavior: true,
    directed: true,
    node: {
      color: "#9b87f5",
      size: 300,
      highlightStrokeColor: "#0EA5E9",
      fontSize: 16,
      fontWeight: "bold",
      highlightFontWeight: "bold",
      labelPosition: "center"
    },
    link: {
      highlightColor: "#0EA5E9",
      color: "#6d8daf",
      type: "CURVE_SMOOTH"
    },
    d3: {
      gravity: -250,
      linkLength: 100
    },
    height: 350,
    width: 600
  };

  return (
    <div className="h-[350px] w-full overflow-hidden bg-os-background/50 rounded-lg p-2 border border-os-primary/20">
      {data.nodes.length > 0 ? (
        <Graph
          id="waits-for-graph"
          data={data}
          config={graphConfig}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-os-text/60">
          No processes to display
        </div>
      )}
    </div>
  );
};

export default GraphVisualization;
