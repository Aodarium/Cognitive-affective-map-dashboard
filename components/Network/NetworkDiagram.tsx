/* eslint-disable arrow-body-style */
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { Link, Node } from './types';

type NetworkDiagramProps = {
  width: number;
  height: number;
  rawData: any;
};
function convert(data: any) {
  const nodes = data.nodes.map((elt: any) => {
    return {
      id: elt.id,
      value: elt.value,
      x: elt.position.x / 10,
      y: elt.position.y / 10,
    } as unknown as Node;
  });
  const links = data.connectors.map((elt: any) => {
    return { source: elt.source, target: elt.target, value: elt.value } as unknown as Link;
  });
  return { nodes, links };
}

export const NetworkDiagram = ({ width, height, rawData }: NetworkDiagramProps) => {
  // The force simulation mutates links and nodes, so create a copy first
  // Node positions are initialized by d3
  const data = convert(rawData);
  const links: Link[] = data.links.map((d: any) => ({ ...d }));
  const nodes: Node[] = data.nodes.map((d: any) => ({ ...d }));

  //const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef(null);
  function getNodeColor(node: any) {
    return node.value < 0 ? '#fa5252' : node.value > 0 ? '#67ceb0' : '#ffda86';
  }
  useEffect(() => {
    // set dimension of the canvas element
    const svg = d3.select(canvasRef.current);
    const simulation = d3
      .forceSimulation()
      .force('charge', d3.forceManyBody().strength(-10))
      .force('center', d3.forceCenter(width / 2, height / 2));
    //let link = svg.append('g').selectAll('dot').data(links).enter();

    //let node = svg.append('g').selectAll('dot').data(nodes).enter();
    const nodeElements = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', getNodeColor);

    const textElements = svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((node) => node.value)
      .attr('font-size', 15)
      .attr('dx', 15)
      .attr('dy', 4);

    const linkElements = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 1)
      .attr('stroke', '#E5E5E5');

    simulation.force(
      'link',
      d3
        .forceLink()// @ts-ignore
        .id((link) => link?.id) // @ts-ignore
        .strength((link) => link?.value)
    );
    simulation.nodes(nodes).on('tick', () => {
      linkElements
        .attr('x1', (link) => link.source.x)
        .attr('y1', (link) => link.source.y)
        .attr('x2', (link) => link.target.x)
        .attr('y2', (link) => link.target.y)
        .attr('stroke', '#000');
      nodeElements.attr('cx', (node) => node.x).attr('cy', (node) => node.y);
      textElements.attr('x', (node) => node.x).attr('y', (node) => node.y);
    });
// @ts-ignore
    simulation?.force('link')?.links(links);
  }, [width, height, nodes, links]);

  return (
    <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
      <svg
        ref={canvasRef}
        style={{
          width,
          height,
        }}
        width={width}
        height={height}
      />
    </div>
  );
};
