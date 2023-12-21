import { Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './Footer.module.css';

// Import your custom logo image
import IfameLogo from './Frame 1 (3).svg';

const FooterCamp = () => {
  return (
    <div className="container">
    <div className={classes.footer}>
      <Container className={classes.inner}>
        {/* Use your custom logo here */}
        <img src={IfameLogo} alt="iFame Logo" style={{ width: '200px', height: 'auto' }} />

        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle" className='mr-5'>
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" className='mr-5'>
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" className='mr-5'>
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
    </div>
  );
}

export default FooterCamp;
