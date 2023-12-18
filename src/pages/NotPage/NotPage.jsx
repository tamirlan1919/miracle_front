import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './NotFoundTitle.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const NotPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '404: Страница не найдена';
    }, []);

    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>Вы нашли секретное место.</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                К сожалению, это всего лишь страница 404. Возможно, вы неправильно ввели адрес или
                страница была перемещена на другой URL.
            </Text>
            <Group justify="center">
                <Button variant="subtle" className={classes.btn} size="md" onClick={() => navigate('/')}>
                    Вернуться на главную страницу
                </Button>
            </Group>
        </Container>
    );
}
