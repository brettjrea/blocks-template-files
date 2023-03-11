import * as React from "react";
import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { Button, Box } from "@primer/react";
import "./index.css";
import plantumlEncoder from 'plantuml-encoder';

interface Props {
  src: string;
  alt: string;
}

const ReactPlantUML: React.FunctionComponent<Props> = (props) => {
  const encode = plantumlEncoder.encode(props.src);
  const url = `http://www.plantuml.com/plantuml/svg/${encode}`;

  return (
    <>
      <img alt={props.alt} src={url} />
    </>
  );
};

export interface ExampleFileBlockProps extends FileBlockProps {
  content: string;
}

export default function ExampleFileBlock(props: ExampleFileBlockProps) {
  const { context, metadata, onUpdateMetadata, content } = props;
  const language = Boolean(context.path)
    ? getLanguageFromFilename(context.path)
    : "N/A";

  return (
    <Box p={4}>
      <Box
        borderColor="border.default"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={6}
        overflow="hidden"
      >
        <Box
          bg="canvas.subtle"
          p={3}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderColor="border.default"
        >
          File: {context.path} {language}
        </Box>
        <Box p={4}>
          {language === "plantuml" && (
            <ReactPlantUML src={content} alt="PlantUML diagram" />
          )}
        </Box>
      </Box>
    </Box>
  );
}

interface CommonBlockProps {
  block: {
    id: string;
    type: string;
    title: string;
    description: string;
    entry: string;
    matches?: string[];
  };
  context: {
    path: string;
    file: string;
    folder: string;
    repo: string;
    owner: string;
    sha: string;
  };
  metadata: any;
  onUpdateMetadata: (newMetadata: any) => void;
  onRequestGitHubData: (path: string, params: Record<string, any>) => Promise<any>;
  onNavigateToPath: (path: string) => void;
  onRequestBlocksRepos: (params?: {
    path?: string;
    searchTerm?: string;
    repoUrl?: string;
    type?: "file" | "folder";
  }) => Promise<BlocksRepo[]>;
  BlockComponent: ({
    block,
    context,
  }: {
    block: { owner: string; repo: string; id: string };
    context?: { owner?: string; repo?: string; path?: string; sha?: string };
  }) => JSX.Element;
}

interface FileBlockProps {
  content: string;
  onUpdateContent: (newContent: string) => void;
  originalContent: string;
  isEditable: boolean;
}

export default Block;
