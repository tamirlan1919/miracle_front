import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './NotFoundTitle.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const NotPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      // Redirect to the 404 page after a short delay
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000); // Adjust the delay as needed
  
      // Clear the timeout on component unmount
      return () => clearTimeout(timeoutId);
    }, [navigate]);
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}