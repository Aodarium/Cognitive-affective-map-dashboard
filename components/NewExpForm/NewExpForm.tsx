import {
  TextInput,
  Title,
  Text,
  Container,
  Group,
  Button,
  NumberInput,
  FileInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './NewExpForm.module.css';

export function NewExpForm({ isLoading, isError, submitFormEvent }: any) {
  function submitForm(formData: any) {
    const { configuration } = formData;
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;
      submitFormEvent({
        configuration: text,
        expName: formData.expName,
        numberOfParticipantsWanted: formData.numberOfParticipantsWanted,
        link: formData.link,
      });
    };
    reader.readAsText(configuration);
  }

  const form = useForm({
    initialValues: {
      expName: '',
      numberOfParticipantsWanted: '',
      link: '',
      configuration: '',
      template: '',
    },
  });

  return (
    <div>
      <Title ta="center" className={classes.title}>
        Adding a new experiment
      </Title>
      <Container size={420} my={40}>
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            label="Name of the experiment"
            placeholder="a nice name"
            {...form.getInputProps('expName')}
            required
          />
          <NumberInput
            label="Number of participants needed"
            withAsterisk
            placeholder="10"
            {...form.getInputProps('numberOfParticipantsWanted')}
          />
          <TextInput
            label="Link to redirect participants to at the end"
            placeholder="some-url.com"
            {...form.getInputProps('link')}
            required
          />

          <FileInput
            label="Experiment file"
            description="File obtained from Cams configurator"
            {...form.getInputProps('configuration')}
          />

          <Group justify="space-between" mt="lg">
            {isError && <Text c="red">Entered credentials are invalid</Text>}
          </Group>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" mt="l" variant="outline" color="green">
              Add experiment
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
