import { FolderBlockProps } from "@githubnext/blocks";
import { Box } from "@primer/react";
import { DataSet } from "vis-data";
import { Network } from "vis-network";
import React, { useRef, useEffect } from 'react';       export default function ExampleFolderBlock(props: FolderBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);    
  useEffect(() => {
    if (!containerRef.current) {
      return;                                               }

    const data = new DataSet({
      nodes: [
        { id: props.context.folder, label: props.context.folder, shape: "box" },                                        ...props.tree.map((item) => ({
          id: item.path,                                          label: item.path,                                       shape: item.type === "tree" ? "box" : "ellipse",
        })),
      ],
      edges: [
        {                                                         from: props.context.folder,
          to: props.tree.map((item) => item.path),              },
      ],
    });

    const network = new Network(containerRef.current, data, {});

    return () => {
      network.destroy();
    };
  }, [props.context.folder, props.tree]);

  return (
    <Box p={4}>
      <Box
        borderColor="border.default"                            borderWidth={1}
        borderStyle="solid"
        borderRadius={6}
        overflow="hidden"                                     >                                                         <Box
          bg="canvas.subtle"
          p={3}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderColor="border.default"
        >                                                         This is the folder content.
        </Box>
        <Box p={4}>                                               <div ref={containerRef} style={{ height: "500px" }} />
        </Box>
      </Box>
    </Box>
  );
}
