import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Text, Collapse, Box } from '@mantine/core';
const ProductDetailsInfoDouble = () => {
    const [opened, { toggle }] = useDisclosure(false);

  return (
    <div>
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button onClick={toggle}>Отзывы</Button>
      </Group>

      <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptates, incidunt recusandae rem perspiciatis nisi saepe repellat ad, dolorem laudantium, eligendi maxime ratione vero nihil iure eius sit voluptatum accusamus!</Text>
      </Collapse>
    </Box>
    </div>
  )
}

export default ProductDetailsInfoDouble
