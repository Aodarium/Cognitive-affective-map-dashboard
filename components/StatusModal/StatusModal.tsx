import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export default function StatusModal({ id, getDataEvent }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  function getData(idElt: string, status: string) {
    getDataEvent(idElt, status);
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Change experiment status">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="submit"
            variant="outline"
            color="lime"
            onClick={() => {
              getData(id, 'active');
            }}
          >
            Set Active
          </Button>
          <Button
            type="submit"
            variant="outline"
            color="red"
            onClick={() => {
              getData(id, 'inactive');
            }}
          >
            Set Inactive
          </Button>
          <Button
            type="submit"
            variant="outline"
            color="pink"
            onClick={() => {
              getData(id, 'archived');
            }}
          >
            Set Archived
          </Button>
        </div>
      </Modal>

      <Button variant="outline" onClick={open}>
        Change status
      </Button>
    </>
  );
}
