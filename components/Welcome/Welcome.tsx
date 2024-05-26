/* eslint-disable react/no-unescaped-entities */
import { Title, Text, Image, Divider, Space } from '@mantine/core';
import classes from './Welcome.module.css';
import { BadgeCard } from '../BadgeCard/BadgeCard';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={80}>
        Cognitive Affective Maps
      </Title>
      <Text c="dimmed" ta="center" size="xl" mx="auto" mt="xl" style={{ width: 500, fontSize: 30 }}>
        Think of{' '}
        <Text span c="green" style={{ fontSize: 30 }}>
          this
        </Text>
        , connect{' '}
        <Text span c="red" style={{ fontSize: 30 }}>
          that
        </Text>
        , and let us map{' '}
        <Text span c="yellow" style={{ fontSize: 30 }}>
          people's mind
        </Text>
      </Text>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image mt="xl" radius="md" src="./canvas.png" h={500} w="auto" fit="contain" />
      </div>
      <Text c="dimmed" ta="center" mx="auto" mt="xl" style={{ width: 1000, fontSize: 30 }}>
        Uncover the hidden connections, unlock the power of emotions, and embark on a journey of
        discovery with Cognitive Affective Maps.
      </Text>
      <Space h="xl" />
      <Divider my="md" />
      <Space h="xl" />

      <Title c="dimmed" ta="center" mx="auto">Some studies based on Cognitive Affective Maps</Title>

      <Space h="xl" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <BadgeCard link="https://iaap-journals.onlinelibrary.wiley.com/doi/full/10.1111/aphw.12283" authors="Lisa Reuter, Julius Fenn, Tobias Andreas Bilo, Melanie Schulz, Annemarie Lina Weyland, Andrea Kiesel, Roland Thomaschke" text="Leisure walks modulate the cognitive and affective representation of the corona pandemic: Employing Cognitive-Affective Maps within a randomized experimental design" />
      <BadgeCard text="Who’s gonna use this? Acceptance prediction of emerging technologies with Cognitive-Affective Mapping and transdisciplinary considerations in the Anthropocene" link="https://journals.sagepub.com/doi/10.1177/20530196221078924" authors="Sabrina Livanec, Michael Stumpf, Lisa Reuter, Julius Fenn, and Andrea Kiesel" />
      <BadgeCard link="https://doi.org/10.1371/journal.pclm.0000207" authors="Julius Fenn, Jessica F. Helm, Philipp Höfele, Lars Kulbe, Andreas Ernst, and Andrea Kiesel" text="Identifying key-psychological factors influencing the acceptance of yet emerging technologies–A multi-method-approach to inform climate policy" />
      </div>
    </>
  );
}
