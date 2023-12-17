import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Text, Collapse, Box } from '@mantine/core';

// Определите интерфейс для типов свойств (props)
interface ProductCharacteristics {
    product:String
  }


const ProductDetailsInfo: React.FC<ProductCharacteristics> = (props) => {
  const [opened, { toggle }] = useDisclosure(false);
  

  return (
    <div>
      <Box maw={400} mx="auto">
        <Group justify="center" mb={5}>
          <Button onClick={toggle}>Характеристика</Button>
        </Group>

        <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
          {/* Используйте props.products.attributes.name или другие ожидаемые свойства */}
          <Text>{props.product}</Text>
        </Collapse>
      </Box>
    </div>
  );
};

export default ProductDetailsInfo;
