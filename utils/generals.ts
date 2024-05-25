export function getStatusColor(status: string): string {
  const mapColor = {
    ACTIVE: 'orange',
    COMPLETE: 'green',
    ARCHIVED: 'yellow',
    INACTIVE: 'red',
  };
  // @ts-ignore
  return mapColor[status] as string;
}

export function copyToClipboard(experimentId: string, link: string) {
  const url =
    `SOURCE-URL${link}participants/getOneExperiment?id=${experimentId}&participantID=`;
  navigator.clipboard.writeText(url);
}
