import { Anchor, Group, Container, Text, Button } from '@mantine/core';
import { useAppStore } from '../../store/app.store';
import { useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const email = useAppStore((state) => state.email); // Get email from Zustand store
    console.log("email", email);

    const handleLogout = () => {
        useAppStore.getState().logout(); // Zustand logout function
        navigate('/login'); // Redirect to login page
    };

    return (
        <Container size="lg" py="md">
            <Group position="apart">
                <Text size="xl" weight={700}>
                    My Website
                </Text>
                <Group>

                    {/* Show user's email if available */}
                    {email && (
                        <Text size="sm" weight={500}>
                            {email}
                        </Text>
                    )}

                    {/* Logout Button */}
                    <Button onClick={handleLogout} variant="outline" color="red">
                        Logout
                    </Button>
                </Group>
            </Group>
        </Container>
    );
};


export default Navbar;
