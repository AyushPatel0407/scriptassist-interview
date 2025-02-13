import { Anchor, Group, Container, Text } from '@mantine/core';

const Footer: React.FC = () => {
    return (
        <Container size="lg" py="md">
            <Group position="apart">
                <Text>&copy; {new Date().getFullYear()} My Website</Text>
                <Group>
                    <Anchor href="https://twitter.com" target="_blank" underline={true}>
                        Twitter
                    </Anchor>
                    <Anchor href="https://github.com" target="_blank" underline={true}>
                        GitHub
                    </Anchor>
                    <Anchor href="https://linkedin.com" target="_blank" underline={true}>
                        LinkedIn
                    </Anchor>
                </Group>
            </Group>
        </Container>
    );
};

export default Footer;
